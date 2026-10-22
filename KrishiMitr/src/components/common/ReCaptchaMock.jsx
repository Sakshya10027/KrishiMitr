import React, { useState } from 'react';
import { Check, RotateCw } from 'lucide-react';

export default function ReCaptchaMock({ verified, onVerify }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (verified || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerify(true);
    }, 700);
  };

  return (
    <div className="shc-recaptcha-box" onClick={handleClick}>
      <div className="shc-recaptcha-left">
        <button
          type="button"
          className={`shc-recaptcha-checkbox ${verified ? 'verified' : ''} ${loading ? 'loading' : ''}`}
          aria-label="I am not a robot checkbox"
        >
          {loading && <RotateCw size={16} className="shc-spin" />}
          {verified && <Check size={18} className="shc-check-icon" />}
        </button>
        <span className="shc-recaptcha-label">I'm not a robot</span>
      </div>

      <div className="shc-recaptcha-right">
        <svg viewBox="0 0 48 48" width="28" height="28">
          <path fill="#4285F4" d="M24 4c11.05 0 20 8.95 20 20 0 2.21-.36 4.33-1.03 6.32l-3.92-2.26C39.63 26.37 40 25.21 40 24c0-8.84-7.16-16-16-16-3.87 0-7.42 1.38-10.21 3.69l-2.83-2.83C14.51 5.92 18.99 4 24 4z"/>
          <path fill="#34A853" d="M8.97 17.68l3.92 2.26C12.37 21.63 12 22.79 12 24c0 8.84 7.16 16 16 16 3.87 0 7.42-1.38 10.21-3.69l2.83 2.83C37.49 42.08 33.01 44 24 44 12.95 44 4 35.05 4 24c0-2.21.36-4.33 1.03-6.32z"/>
          <path fill="#FBBC05" d="M24 16c4.42 0 8 3.58 8 8 0 1.25-.29 2.43-.8 3.48l-3.46-2C27.91 24.96 28 24.49 28 24c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .49.09.96.26 1.48l-3.46 2C16.29 26.43 16 25.25 16 24c0-4.42 3.58-8 8-8z"/>
        </svg>
        <div className="shc-recaptcha-terms">
          <small>reCAPTCHA</small>
          <div className="shc-recaptcha-sublinks">
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy</a>
            <span> - </span>
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
