import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { DIRECTORY_DAC_FW, DIRECTORY_ICAR } from '../services/resourceService';
import { Phone, Mail, Building, User } from 'lucide-react';

export default function ContactUsPage() {
  const [activeTab, setActiveTab] = useState('dac'); // 'dac' | 'icar'

  const currentDirectory = activeTab === 'dac' ? DIRECTORY_DAC_FW : DIRECTORY_ICAR;

  return (
    <div className="shc-page-container">
      <Breadcrumb title="Contact us" />

      <main className="shc-main-content">
        <div className="shc-page-header-standard">
          <h1>Official Contact Directory</h1>
          <p>
            Key administrative and scientific officers of the Department of Agriculture &amp; Farmers Welfare (DA&amp;FW) and Indian Council of Agricultural Research (ICAR).
          </p>
        </div>

        {/* Directory Tabs */}
        <div className="shc-school-tabs-wrap">
          <div className="shc-school-tabs">
            <button
              type="button"
              className={`shc-school-tab ${activeTab === 'dac' ? 'active' : ''}`}
              onClick={() => setActiveTab('dac')}
            >
              DAC &amp; FW Officers
            </button>
            <button
              type="button"
              className={`shc-school-tab ${activeTab === 'icar' ? 'active' : ''}`}
              onClick={() => setActiveTab('icar')}
            >
              ICAR Officers &amp; Scientists
            </button>
          </div>
        </div>

        {/* Directory Table */}
        <div className="shc-table-responsive shc-directory-table-wrap">
          <table className="shc-data-table">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Designation / Role</th>
                <th>Office Address</th>
                <th>Contact Details</th>
              </tr>
            </thead>
            <tbody>
              {currentDirectory.map((officer, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="shc-officer-name-cell">
                      <User size={18} className="shc-user-icon" />
                      <strong>{officer.name}</strong>
                    </div>
                  </td>
                  <td>{officer.designation}</td>
                  <td>
                    <div className="shc-office-cell">
                      <Building size={14} />
                      <span>{officer.office}</span>
                    </div>
                  </td>
                  <td>
                    <div className="shc-contact-links">
                      <a href={`tel:${officer.phone}`} className="shc-contact-link">
                        <Phone size={13} />
                        <span>{officer.phone}</span>
                      </a>
                      <a href={`mailto:${officer.email}`} className="shc-contact-link">
                        <Mail size={13} />
                        <span>{officer.email}</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
