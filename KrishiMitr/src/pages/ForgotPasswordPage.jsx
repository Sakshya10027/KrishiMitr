import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier) return;
    setSubmitted(true);
  };

  return (
    <div className="shc-page-container">
      <Breadcrumb title="Forgot Password" />

      <main className="shc-main-content">
        <div className="shc-auth-form-container">
          <div className="shc-auth-form-card">
            <div className="shc-auth-form-header">
              <div className="shc-auth-icon-circle">
                <KeyRound size={24} />
              </div>
              <h2>Password Recovery</h2>
              <p>Enter your registered Username, official Email address, or Mobile number to reset your password.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="shc-form-fields">
                <div className="shc-input-group">
                  <label className="shc-floating-label">Username / Email / Mobile *</label>
                  <input
                    type="text"
                    placeholder="e.g. stl.analyst.ldh@punjab.gov.in"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    required
                    className="shc-text-input"
                  />
                </div>

                <button type="submit" className="shc-btn-green-solid full-width">
                  Send Recovery Link / OTP
                </button>
              </form>
            ) : (
              <div className="shc-ticket-success">
                <CheckCircle2 size={44} className="success-icon" />
                <h4>Recovery Instructions Sent!</h4>
                <p>
                  A simulated password reset OTP and verification link have been dispatched to the registered credentials for <strong>{identifier}</strong>.
                </p>
              </div>
            )}

            <div className="shc-auth-back-row">
              <Link to="/admin" className="shc-btn-secondary small">
                <ArrowLeft size={14} />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
