import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { CIRCULARS_AND_GUIDELINES } from '../services/resourceService';
import { FileText, Download, Eye, Calendar, Tag } from 'lucide-react';

export default function GeneralResourcesPage() {
  return (
    <div className="shc-page-container">
      <Breadcrumb title="General Resources" />

      <main className="shc-main-content">
        <div className="shc-page-header-standard">
          <h1>Circulars, SOPs &amp; Technical Guidelines</h1>
          <p>
            Official notifications, operating protocols, security audit compliance certificates, and technical integration specifications issued by the Ministry of Agriculture and Farmers Welfare.
          </p>
        </div>

        <div className="shc-table-responsive shc-resources-table-wrap">
          <table className="shc-data-table">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Document Title</th>
                <th style={{ width: '18%' }}>Category</th>
                <th style={{ width: '15%' }}>Date of Issue</th>
                <th style={{ width: '10%' }}>Size</th>
                <th style={{ width: '12%' }} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {CIRCULARS_AND_GUIDELINES.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="shc-res-title-cell">
                      <FileText size={18} className="shc-res-icon" />
                      <div>
                        <strong>{doc.title}</strong>
                        <small className="shc-res-id">{doc.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="shc-badge-neutral">{doc.category}</span>
                  </td>
                  <td>
                    <div className="shc-date-cell">
                      <Calendar size={13} />
                      <span>{doc.date}</span>
                    </div>
                  </td>
                  <td className="text-center">{doc.fileSize}</td>
                  <td className="text-center">
                    <div className="shc-action-buttons">
                      <button 
                        type="button" 
                        className="shc-btn-icon" 
                        title="View Document"
                        onClick={() => alert(`Opening ${doc.title}`)}
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="shc-btn-icon" 
                        title="Download Document"
                        onClick={() => alert(`Downloading ${doc.title} (${doc.fileSize})`)}
                      >
                        <Download size={16} />
                      </button>
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
