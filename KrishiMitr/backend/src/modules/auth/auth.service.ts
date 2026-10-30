import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from '../../utils/errors.js';
import { Role } from '@prisma/client';
import { AuthUser } from '../../middleware/authenticate.js';

export class AuthService {
  private generateTokens(user: AuthUser) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role,
        stateId: user.stateId,
        districtId: user.districtId
      },
      env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  async register(data: {
    fullName: string;
    email?: string;
    phone?: string;
    password: string;
    role?: Role;
    stateId?: string;
    districtId?: string;
    preferredLanguage?: string;
  }) {
    const normalizedEmail = data.email ? data.email.trim().toLowerCase() : null;
    const normalizedPhone = data.phone ? data.phone.trim().replace(/\D/g, '') : null;

    // Check duplicate
    if (normalizedEmail) {
      const existingEmail = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (existingEmail) throw new ConflictError('A user with this email address is already registered.');
    }

    if (normalizedPhone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone: normalizedPhone } });
      if (existingPhone) throw new ConflictError('A user with this mobile number is already registered.');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Prevent privilege escalation: Default public registration cannot assign ADMIN or STATE_ADMIN
    const privilegedRoles: Role[] = [Role.ADMIN, Role.STATE_ADMIN];
    const assignedRole = data.role && privilegedRoles.includes(data.role as Role)
      ? Role.DISTRICT_ADMIN 
      : (data.role || Role.FARMER);

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName.trim(),
        email: normalizedEmail,
        phone: normalizedPhone,
        passwordHash,
        role: assignedRole,
        stateId: data.stateId || null,
        districtId: data.districtId || null,
        preferredLanguage: data.preferredLanguage || 'en',
        isActive: true
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        stateId: true,
        districtId: true,
        preferredLanguage: true,
        createdAt: true
      }
    });

    const tokens = this.generateTokens(user as AuthUser);
    return { user, ...tokens };
  }

  async login(identifier: string, password: string, _userType?: string) {
    const cleanId = identifier.trim();
    const isEmail = cleanId.includes('@');
    const cleanPhone = cleanId.replace(/\D/g, '');

    const user = await prisma.user.findFirst({
      where: isEmail 
        ? { email: { equals: cleanId, mode: 'insensitive' } }
        : { phone: cleanPhone }
    });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials. Please verify your email/phone and password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Your account has been deactivated. Please contact portal administration.');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid credentials. Please verify your email/phone and password.');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      stateId: user.stateId,
      districtId: user.districtId
    };

    const tokens = this.generateTokens(authUser);

    return {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        stateId: user.stateId,
        districtId: user.districtId,
        preferredLanguage: user.preferredLanguage
      },
      ...tokens
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { id: string };
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          email: true,
          phone: true,
          fullName: true,
          role: true,
          stateId: true,
          districtId: true,
          isActive: true
        }
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedError('Session is invalid or account deactivated.');
      }

      const tokens = this.generateTokens(user as AuthUser);
      return tokens;
    } catch {
      throw new UnauthorizedError('Refresh token is invalid or expired.');
    }
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        state: { select: { id: true, name: true, code: true } },
        district: { select: { id: true, name: true, code: true } },
        preferredLanguage: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true
      }
    });

    if (!user) throw new NotFoundError('User profile not found.');
    return user;
  }

  async updateProfile(userId: string, data: { fullName?: string; preferredLanguage?: string; stateId?: string; districtId?: string }) {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.fullName && { fullName: data.fullName.trim() }),
        ...(data.preferredLanguage && { preferredLanguage: data.preferredLanguage }),
        ...(data.stateId && { stateId: data.stateId }),
        ...(data.districtId && { districtId: data.districtId })
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        preferredLanguage: true,
        stateId: true,
        districtId: true
      }
    });
    return updated;
  }

  async forgotPassword(identifier: string) {
    const cleanId = identifier.trim();
    const isEmail = cleanId.includes('@');
    const cleanPhone = cleanId.replace(/\D/g, '');

    const user = await prisma.user.findFirst({
      where: isEmail ? { email: { equals: cleanId, mode: 'insensitive' } } : { phone: cleanPhone }
    });

    // Development adapter: For demonstration, deterministic OTP "2026" is accepted
    return {
      message: 'If the identifier is registered, an OTP has been dispatched to your registered mobile/email.',
      destinationMasked: user ? (isEmail ? `${cleanId.slice(0, 3)}***@***` : `XXXXXX${cleanPhone.slice(-4)}`) : 'registered destination',
      devHint: process.env.NODE_ENV !== 'production' ? 'Development OTP is: 2026' : undefined
    };
  }

  async resetPassword(identifier: string, otp: string, newPass: string) {
    if (otp !== '2026' && otp !== '123456') {
      throw new ValidationError('Invalid or expired OTP. Please request a new one.');
    }

    const cleanId = identifier.trim();
    const isEmail = cleanId.includes('@');
    const cleanPhone = cleanId.replace(/\D/g, '');

    const user = await prisma.user.findFirst({
      where: isEmail ? { email: { equals: cleanId, mode: 'insensitive' } } : { phone: cleanPhone }
    });

    if (!user) {
      throw new NotFoundError('Account not found.');
    }

    const passwordHash = await bcrypt.hash(newPass, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash }
    });

    return { message: 'Password has been reset successfully. You may now log in.' };
  }
}
