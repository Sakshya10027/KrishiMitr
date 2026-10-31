import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { STATES_AND_DISTRICTS } from '../services/labService';

export default function RAWERegistrationPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    universityName: '',
    degreeProgram: 'B.Sc. (Hons) Agriculture',
    studentId: '',
    mobile: '',
    email: '',
    assignedState: '',
    assignedDistrict: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="shc-page-container">
      <Breadcrumb title="RAWE Registration" />

      <main className="shc-main-content">
        <div className="shc-auth-form-container">
          <div className="shc-auth-form-card wide">
            <div className="shc-auth-form-header">
              <div className="shc-auth-icon-circle">
                <GraduationCap size={24} />
              </div>
              <h2>RAWE Student Registration</h2>
              <p>Rural Agricultural Work Experience (RAWE) / Student Volunteer Registration for Soil Sampling &amp; Farmer Extension.</p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="shc-form-fields">
                <div className="shc-grid-2col">
                  <div className="shc-input-group">
                    <label className="shc-floating-label">Student Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Amanpreet Kaur"
                      value={formData.studentName}
                      onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">College / University Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Punjab Agricultural University (PAU)"
                      value={formData.universityName}
                      onChange={e => setFormData({ ...formData, universityName: e.target.value })}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">Student Roll / Enrollment No. *</label>
                    <input
                      type="text"
                      placeholder="e.g. 2022-AG-142"
                      value={formData.studentId}
                      onChange={e => setFormData({ ...formData, studentId: e.target.value })}
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
                    <label className="shc-select-label">Assigned State for Fieldwork *</label>
                    <select
                      value={formData.assignedState}
                      onChange={e => setFormData({ ...formData, assignedState: e.target.value, assignedDistrict: '' })}
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
                    <label className="shc-select-label">Assigned District *</label>
                    <select
                      value={formData.assignedDistrict}
                      onChange={e => setFormData({ ...formData, assignedDistrict: e.target.value })}
                      required
                      disabled={!formData.assignedState}
                      className="shc-select"
                    >
                      <option value="">-- Select District --</option>
                      {(STATES_AND_DISTRICTS[formData.assignedState] || []).map(dt => (
                        <option key={dt} value={dt}>{dt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="shc-btn-green-solid full-width">
                  Register for RAWE Field Access
                </button>
              </form>
            ) : (
              <div className="shc-ticket-success">
                <CheckCircle2 size={44} className="success-icon" />
                <h4>RAWE Volunteer Profile Registered</h4>
                <p>
                  Demonstration enrollment completed for student <strong>{formData.studentName}</strong> ({formData.studentId}) from {formData.universityName}.
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
