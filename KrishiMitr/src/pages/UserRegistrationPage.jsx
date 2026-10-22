import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { STATES_AND_DISTRICTS } from '../services/labService';

export default function UserRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    officialEmail: '',
    mobile: '',
    roleCategory: 'District Agricultural Officer',
    state: '',
    district: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="shc-page-container">
      <Breadcrumb title="User Registration" />

      <main className="shc-main-content">
        <div className="shc-auth-form-container">
          <div className="shc-auth-form-card wide">
            <div className="shc-auth-form-header">
              <div className="shc-auth-icon-circle">
                <UserPlus size={24} />
              </div>
              <h2>Official User Registration</h2>
              <p>Register as an authorized State, District, or Laboratory officer on the Soil Health Card Portal.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="shc-form-fields">
                <div className="shc-grid-2col">
                  <div className="shc-input-group">
                    <label className="shc-floating-label">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">Official Designation *</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Soil Chemist"
                      value={formData.designation}
                      onChange={e => setFormData({ ...formData, designation: e.target.value })}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">Official Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. officer@gov.in or @nic.in"
                      value={formData.officialEmail}
                      onChange={e => setFormData({ ...formData, officialEmail: e.target.value })}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      maxLength={10}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-select-label">Select State *</label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value, district: '' })}
                      required
                      className="shc-select"
                    >
                      <option value="">-- Select State --</option>
                      {Object.keys(STATES_AND_DISTRICTS).map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-select-label">Select District *</label>
                    <select
                      value={formData.district}
                      onChange={e => setFormData({ ...formData, district: e.target.value })}
                      required
                      disabled={!formData.state}
                      className="shc-select"
                    >
                      <option value="">-- Select District --</option>
                      {(STATES_AND_DISTRICTS[formData.state] || []).map(dt => (
                        <option key={dt} value={dt}>{dt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="shc-btn-green-solid full-width">
                  Submit Official Registration Request
                </button>
              </form>
            ) : (
              <div className="shc-ticket-success">
                <CheckCircle2 size={44} className="success-icon" />
                <h4>Registration Application Received</h4>
                <p>
                  Demonstration registration submitted for <strong>{formData.fullName}</strong>. In live government operations, registration requests require verification by the State Nodal Officer before login access is activated.
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
