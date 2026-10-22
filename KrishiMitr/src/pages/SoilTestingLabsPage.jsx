import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { STATES_AND_DISTRICTS, MOCK_LABS, getLabsByLocation } from '../services/labService';
import { 
  MapPin, Phone, Mail, Award, CheckCircle, Search, 
  RotateCcw, Building2, Truck, FlaskConical, Clock, 
  ExternalLink, HelpCircle, ShieldCheck
} from 'lucide-react';

export default function SoilTestingLabsPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [labs, setLabs] = useState(MOCK_LABS);

  const availableDistricts = selectedState ? (STATES_AND_DISTRICTS[selectedState] || []) : [];

  const performSearch = (stateVal, districtVal, typeVal, searchVal) => {
    const filtered = getLabsByLocation({
      state: stateVal,
      district: districtVal,
      labType: typeVal,
      searchTerm: searchVal
    });
    setLabs(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(selectedState, selectedDistrict, selectedType, searchTerm);
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedDistrict('');
    // Proactively fetch all labs for this newly selected state
    performSearch(newState, '', selectedType, searchTerm);
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    performSearch(selectedState, newDistrict, selectedType, searchTerm);
  };

  const handleTypeSelect = (typeKey) => {
    setSelectedType(typeKey);
    performSearch(selectedState, selectedDistrict, typeKey, searchTerm);
  };

  const handleReset = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSearchTerm('');
    setSelectedType('All');
    setLabs(MOCK_LABS);
  };

  const getBadgeClass = (type = '') => {
    if (type.includes('Mobile')) return 'shc-lab-badge mobile';
    if (type.includes('KVK')) return 'shc-lab-badge kvk';
    if (type.includes('University') || type.includes('Research')) return 'shc-lab-badge univ';
    return 'shc-lab-badge';
  };

  const getLocationTitle = () => {
    if (selectedState && selectedDistrict) {
      return `${selectedDistrict}, ${selectedState}`;
    }
    if (selectedState) {
      return selectedState;
    }
    return 'All India';
  };

  return (
    <div className="shc-page-container">
      <Breadcrumb title="STL" />

      <main className="shc-main-content">
        {/* National Network Overview Ribbon */}
        <div className="shc-stl-stats-ribbon">
          <div className="shc-stl-stat-card">
            <div className="shc-stl-stat-icon">
              <Building2 size={22} />
            </div>
            <div className="shc-stl-stat-content">
              <span className="shc-stl-stat-val">3,850+</span>
              <span className="shc-stl-stat-label">Registered Static Labs</span>
            </div>
          </div>

          <div className="shc-stl-stat-card">
            <div className="shc-stl-stat-icon">
              <Truck size={22} />
            </div>
            <div className="shc-stl-stat-content">
              <span className="shc-stl-stat-val">1,240+</span>
              <span className="shc-stl-stat-label">Mobile Testing Vans</span>
            </div>
          </div>

          <div className="shc-stl-stat-card">
            <div className="shc-stl-stat-icon">
              <FlaskConical size={22} />
            </div>
            <div className="shc-stl-stat-content">
              <span className="shc-stl-stat-val">12 Parameters</span>
              <span className="shc-stl-stat-label">Standard SHC Protocol</span>
            </div>
          </div>

          <div className="shc-stl-stat-card">
            <div className="shc-stl-stat-icon">
              <ShieldCheck size={22} />
            </div>
            <div className="shc-stl-stat-content">
              <span className="shc-stl-stat-val">750+ Districts</span>
              <span className="shc-stl-stat-label">All 36 States & UTs Covered</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Form */}
        <div className="shc-stl-filter-box">
          <form onSubmit={handleSearchSubmit} className="shc-stl-filter-form">
            {/* State Select */}
            <div className="shc-stl-select-wrap">
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="shc-select"
                aria-label="Select State"
              >
                <option value="">Select State (All 36 States & UTs)</option>
                {Object.keys(STATES_AND_DISTRICTS).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District Select */}
            <div className="shc-stl-select-wrap">
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="shc-select"
                disabled={!selectedState}
                aria-label="Select District"
              >
                <option value="">{selectedState ? 'All Districts' : 'Select State First'}</option>
                {availableDistricts.map(dt => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            {/* Quick Text Search */}
            <div className="shc-stl-search-input-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by lab name, pin code, or officer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shc-stl-search-input"
              />
            </div>

            <button type="submit" className="shc-btn-green-solid">
              Search
            </button>

            {(selectedState || selectedDistrict || searchTerm || selectedType !== 'All') && (
              <button 
                type="button" 
                onClick={handleReset} 
                className="shc-btn-secondary"
                title="Reset all filters"
              >
                <RotateCcw size={15} style={{ marginRight: '4px' }} />
                Reset
              </button>
            )}
          </form>
        </div>

        {/* Lab Type Filter Pills */}
        <div className="shc-stl-type-tabs">
          {[
            { key: 'All', label: 'All Laboratories' },
            { key: 'Static', label: 'District Static Labs' },
            { key: 'KVK', label: 'ICAR - KVK Labs' },
            { key: 'Mobile', label: 'Mobile Testing Vans' },
            { key: 'University', label: 'University & Research' }
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTypeSelect(tab.key)}
              className={`shc-stl-type-btn ${selectedType === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="shc-stl-results-container">
          <div className="shc-stl-results-header">
            <div>
              <h3>
                Registered Soil Testing Laboratories ({labs.length})
              </h3>
              <span className="shc-stl-hint">
                Showing accredited testing facilities and mobile vans in <strong>{getLocationTitle()}</strong>
              </span>
            </div>
            {labs.length > 0 && (
              <span className="shc-stl-hint">
                Turnaround: 5-7 working days | Free Soil Health Card Issuance
              </span>
            )}
          </div>

          {/* Cards Grid */}
          {labs.length > 0 ? (
            <div className="shc-stl-cards-grid">
              {labs.map(lab => (
                <div key={lab.id} className="shc-lab-card">
                  <div className="shc-lab-card-top">
                    <div>
                      <span className={getBadgeClass(lab.type)}>{lab.type}</span>
                      <h4 className="shc-lab-title">{lab.name}</h4>
                    </div>
                    <span className="shc-lab-nabl" title="Certified & Accredited Laboratory">
                      <CheckCircle size={14} />
                      {lab.status}
                    </span>
                  </div>

                  <div className="shc-lab-address">
                    <MapPin size={16} className="shc-lab-icon" />
                    <span>{lab.address}</span>
                  </div>

                  {/* Extra timing and fee info */}
                  {(lab.timings || lab.fees) && (
                    <div className="shc-lab-extra-info">
                      {lab.timings && (
                        <div className="shc-lab-extra-row">
                          <Clock size={13} style={{ color: '#018840' }} />
                          <span><strong>Working Hours:</strong> {lab.timings}</span>
                        </div>
                      )}
                      {lab.fees && (
                        <div className="shc-lab-extra-row">
                          <Award size={13} style={{ color: '#b45309' }} />
                          <span><strong>Testing Fees:</strong> {lab.fees}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="shc-lab-meta-grid">
                    <div className="shc-lab-meta-item">
                      <span className="meta-label">In-Charge Officer:</span>
                      <span className="meta-val">{lab.inCharge}</span>
                    </div>
                    <div className="shc-lab-meta-item">
                      <span className="meta-label">Annual Testing Capacity:</span>
                      <span className="meta-val">{lab.capacityYear}</span>
                    </div>
                    <div className="shc-lab-meta-item">
                      <span className="meta-label">Contact Phone:</span>
                      <a href={`tel:${lab.phone}`} className="meta-val link">
                        <Phone size={13} /> {lab.phone}
                      </a>
                    </div>
                    <div className="shc-lab-meta-item">
                      <span className="meta-label">Email:</span>
                      <a href={`mailto:${lab.email}`} className="meta-val link">
                        <Mail size={13} /> {lab.email}
                      </a>
                    </div>
                  </div>

                  <div className="shc-lab-capabilities">
                    <span className="caps-label">Accredited Testing Facilities (12 Parameters):</span>
                    <div className="caps-tags">
                      {lab.testCapabilities.map((cap, i) => (
                        <span key={i} className="cap-tag">{cap}</span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="shc-lab-actions">
                    <a href={`tel:${lab.phone}`} className="shc-lab-act-btn outline">
                      <Phone size={14} /> Call Lab
                    </a>
                    <a href={`mailto:${lab.email}?subject=Soil%20Sample%20Testing%20Inquiry%20-%20Soil%20Health%20Card`} className="shc-lab-act-btn outline">
                      <Mail size={14} /> Send Email
                    </a>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lab.name}, ${lab.address}`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shc-lab-act-btn primary"
                    >
                      <ExternalLink size={14} /> Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="shc-stl-empty-state">
              <div className="shc-stl-empty-icon">
                <HelpCircle size={32} />
              </div>
              <h4 className="shc-stl-empty-title">No Laboratories Found</h4>
              <p className="shc-stl-empty-desc">
                We couldn't find any laboratories matching your filter criteria. Try clearing your keyword filter, switching the laboratory type to "All Laboratories", or resetting filters.
              </p>
              <button onClick={handleReset} className="shc-btn-green-solid">
                <RotateCcw size={15} style={{ marginRight: '6px' }} />
                Reset Search Filters
              </button>

              <div>
                <div className="shc-stl-helpline-box">
                  <Phone size={18} />
                  <span>
                    Need immediate assistance? Call the <strong>Kisan Call Centre: 1800-180-1551</strong> (Toll Free, 6:00 AM – 10:00 PM)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
