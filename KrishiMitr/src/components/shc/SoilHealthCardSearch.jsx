import React, { useState } from 'react';
import ReCaptchaMock from '../common/ReCaptchaMock';
import { STATES_AND_DISTRICTS } from '../../services/labService';
import { searchSoilHealthCard } from '../../services/soilHealthService';

export default function SoilHealthCardSearch({ onSelectCard }) {
  const [activeTab, setActiveTab] = useState('SHC'); // 'SHC' | 'School SHC'
  const [searchBy, setSearchBy] = useState('phone'); // 'phone' | 'name'
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Name search fields
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [farmerName, setFarmerName] = useState('');

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDistricts = selectedState ? (STATES_AND_DISTRICTS[selectedState] || []) : [];

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(val);
    setErrorMessage('');
  };

  const isFormValid = () => {
    if (!captchaVerified) return false;
    if (searchBy === 'phone') {
      return phoneNumber.length >= 10;
    } else {
      return farmerName.trim().length > 0;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const results = searchSoilHealthCard({
        queryType: searchBy,
        phoneNumber,
        farmerName,
        state: selectedState,
        district: selectedDistrict,
        village
      });

      setIsSubmitting(false);

      if (results && results.length > 0) {
        onSelectCard(results[0]);
      } else {
        setErrorMessage('No Soil Health Card found for the provided details. Please verify the mobile number or try one of the demo records.');
      }
    }, 500);
  };

  const handleQuickDemo = (demoType) => {
    if (demoType === 'punjab') {
      setSearchBy('phone');
      setPhoneNumber('9876543210');
      setCaptchaVerified(true);
      const results = searchSoilHealthCard({ queryType: 'phone', phoneNumber: '9876543210' });
      if (results.length > 0) onSelectCard(results[0]);
    } else if (demoType === 'up') {
      setSearchBy('phone');
      setPhoneNumber('9415012345');
      setCaptchaVerified(true);
      const results = searchSoilHealthCard({ queryType: 'phone', phoneNumber: '9415012345' });
      if (results.length > 0) onSelectCard(results[0]);
    } else if (demoType === 'mh') {
      setSearchBy('phone');
      setPhoneNumber('9822019921');
      setCaptchaVerified(true);
      const results = searchSoilHealthCard({ queryType: 'phone', phoneNumber: '9822019921' });
      if (results.length > 0) onSelectCard(results[0]);
    }
  };

  return (
    <div className="shc-search-card-container">
      {/* Tabs */}
      <div className="shc-search-tabs">
        <button
          type="button"
          className={`shc-search-tab ${activeTab === 'SHC' ? 'active' : ''}`}
          onClick={() => setActiveTab('SHC')}
        >
          SHC
        </button>
        <button
          type="button"
          className={`shc-search-tab ${activeTab === 'School SHC' ? 'active' : ''}`}
          onClick={() => setActiveTab('School SHC')}
        >
          School SHC
        </button>
      </div>

      <div className="shc-search-body">
        {/* Search By Radio Group */}
        <div className="shc-radio-group-wrap">
          <span className="shc-radio-title">Search By</span>
          <div className="shc-radio-options">
            <label className="shc-radio-label">
              <input
                type="radio"
                name="searchBy"
                value="phone"
                checked={searchBy === 'phone'}
                onChange={() => {
                  setSearchBy('phone');
                  setErrorMessage('');
                }}
              />
              <span className="shc-radio-custom" />
              <span>Phone Number</span>
            </label>

            <label className="shc-radio-label">
              <input
                type="radio"
                name="searchBy"
                value="name"
                checked={searchBy === 'name'}
                onChange={() => {
                  setSearchBy('name');
                  setErrorMessage('');
                }}
              />
              <span className="shc-radio-custom" />
              <span>Farmer Name</span>
            </label>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="shc-form-fields">
          {searchBy === 'phone' ? (
            <div className="shc-input-group">
              <label htmlFor="phoneInput" className="shc-floating-label">Phone number</label>
              <div className="shc-phone-input-wrap">
                <span className="shc-phone-prefix">+91</span>
                <input
                  id="phoneInput"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  className="shc-text-input"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="shc-cascading-grid">
              <div className="shc-input-group">
                <label className="shc-select-label">Select State</label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('');
                  }}
                  className="shc-select"
                >
                  <option value="">-- Select State --</option>
                  {Object.keys(STATES_AND_DISTRICTS).map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="shc-input-group">
                <label className="shc-select-label">Select District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="shc-select"
                  disabled={!selectedState}
                >
                  <option value="">-- Select District --</option>
                  {availableDistricts.map(dt => (
                    <option key={dt} value={dt}>{dt}</option>
                  ))}
                </select>
              </div>

              <div className="shc-input-group">
                <label className="shc-floating-label">Sub-District / Taluka</label>
                <input
                  type="text"
                  placeholder="Enter Taluka / Tehsil"
                  value={subDistrict}
                  onChange={(e) => setSubDistrict(e.target.value)}
                  className="shc-text-input"
                />
              </div>

              <div className="shc-input-group">
                <label className="shc-floating-label">Village Name</label>
                <input
                  type="text"
                  placeholder="Enter Village"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="shc-text-input"
                />
              </div>

              <div className="shc-input-group full-width">
                <label className="shc-floating-label">Farmer Name *</label>
                <input
                  type="text"
                  placeholder="Enter registered farmer name"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="shc-text-input"
                  required
                />
              </div>
            </div>
          )}

          {/* reCAPTCHA */}
          <div className="shc-recaptcha-center">
            <ReCaptchaMock 
              verified={captchaVerified} 
              onVerify={setCaptchaVerified} 
            />
          </div>

          {errorMessage && (
            <div className="shc-form-error-msg" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="shc-form-actions">
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`shc-submit-btn ${isFormValid() ? 'enabled' : 'disabled'}`}
            >
              {isSubmitting ? 'Searching...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Demo Record Shortcuts for Evaluation */}
        <div className="shc-demo-hints">
          <span className="shc-demo-hints-title">Quick Demo Test Records:</span>
          <div className="shc-demo-chip-group">
            <button type="button" className="shc-demo-chip" onClick={() => handleQuickDemo('punjab')}>
              Gurpreet Singh (Punjab, +91 9876543210)
            </button>
            <button type="button" className="shc-demo-chip" onClick={() => handleQuickDemo('up')}>
              Rameshwar Yadav (UP, +91 9415012345)
            </button>
            <button type="button" className="shc-demo-chip" onClick={() => handleQuickDemo('mh')}>
              Sunita Patil (MH, +91 9822019921)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
