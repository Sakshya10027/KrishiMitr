import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';
import emblemImg from '../assets/logos/emblem-india.svg';
import shcLogo from '../assets/logos/shc-logo.svg';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stl'); // 'stl' | 'school' | 'other'
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userTypeOptions = {
    stl: [
      'Select User Type',
      'National Admin (DAC & FW)',
      'State Nodal Officer',
      'District Agricultural Officer',
      'Soil Testing Laboratory (STL) Analyst',
      'Mobile STL In-Charge'
    ],
    school: [
      'Select User Type',
      'School Principal / Nodal Teacher',
      'Student Lab Volunteer'
    ],
    other: [
      'Select User Type',
      'ICAR Coordinating Scientist',
      'KVK Technical Officer',
      'Fertilizer Company Quality Auditor'
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userType || userType === 'Select User Type' || !username || !password) {
      setLoginMessage({ type: 'error', text: 'Please select a User type and provide valid credentials.' });
      return;
    }

    setIsSubmitting(true);
    setLoginMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setLoginMessage({ 
        type: 'success', 
        text: `Demonstration login successful for "${username}" (${userType}). Redirecting to Legacy Dashboard...` 
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 700);
  };

  const handleDemoFill = () => {
    setUserType('Soil Testing Laboratory (STL) Analyst');
    setUsername('stl.analyst.ldh@punjab.gov.in');
    setPassword('Punjab@Soil2026');
  };

  return (
    <div className="shc-admin-page-container">
      {/* Admin Login Box */}
      <div className="shc-admin-card">
        {/* Navigation Tabs */}
        <div className="shc-admin-tabs">
          <button
            type="button"
            className={`shc-admin-tab ${activeTab === 'stl' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('stl');
              setUserType('');
            }}
          >
            Center/State/District/STL
          </button>
          <button
            type="button"
            className={`shc-admin-tab ${activeTab === 'school' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('school');
              setUserType('');
            }}
          >
            School SHC
          </button>
          <button
            type="button"
            className={`shc-admin-tab ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('other');
              setUserType('');
            }}
          >
            Other Users
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="shc-admin-form">
          <div className="shc-input-group">
            <label className="shc-floating-label">User type *</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="shc-select"
              required
            >
              {(userTypeOptions[activeTab] || []).map((opt, i) => (
                <option key={i} value={i === 0 ? '' : opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="shc-input-group">
            <label className="shc-floating-label">Username/Email address *</label>
            <input
              type="text"
              placeholder="Username or registered email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shc-text-input"
              required
            />
          </div>

          <div className="shc-input-group">
            <label className="shc-floating-label">Password *</label>
            <div className="shc-password-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shc-text-input"
                required
              />
              <button
                type="button"
                className="shc-password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {loginMessage && (
            <div className={`shc-auth-msg ${loginMessage.type}`}>
              {loginMessage.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              <span>{loginMessage.text}</span>
            </div>
          )}

          <div className="shc-admin-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="shc-btn-green-solid full-width"
            >
              {isSubmitting ? 'Verifying...' : 'Login'}
            </button>
          </div>

          <div className="shc-admin-forgot-wrap">
            <Link to="/admin/ForgotPassword" className="shc-forgot-link">
              Forgot Password
            </Link>
          </div>

          <div className="shc-auth-divider">
            <span>OR</span>
          </div>

          <div className="shc-auth-secondary-actions">
            <Link to="/admin/userRegistration" className="shc-btn-outline full-width">
              User Registration
            </Link>
            <Link to="/admin/RAWERegistration" className="shc-btn-outline full-width">
              RAWE Registration
            </Link>
          </div>
        </form>

        <div className="shc-auth-demo-hint">
          <span>Demonstration Testing Shortcut: </span>
          <button type="button" onClick={handleDemoFill} className="shc-btn-link">
            Auto-fill STL Analyst Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
