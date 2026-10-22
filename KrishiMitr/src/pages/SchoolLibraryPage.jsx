import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { BookOpen, Video, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function SchoolLibraryPage() {
  const libraryItems = [
    {
      title: 'Student Handbook: Fundamentals of Soil Science & Agricultural Chemistry',
      type: 'PDF Manual',
      size: '4.8 MB',
      description: 'Comprehensive curriculum module for class 9-12 students on soil testing, nutrient cycles, and soil classification.',
      pages: '48 pages'
    },
    {
      title: 'Step-by-Step SOP for Soil Sampling in Farmer Fields (School Guide)',
      type: 'Standard Operating Procedure',
      size: '2.1 MB',
      description: 'Illustrated guide on V-shaped cut sampling, composite mixing, drying, sieving, and sample tagging.',
      pages: '16 pages'
    },
    {
      title: 'Video Guide: Operating Mini Soil Testing Laboratory (MSTL) Kits',
      type: 'Video Module',
      size: '18 min MP4',
      description: 'Demonstration of chemical reagent testing for available N, P, K, and soil pH estimation.',
      pages: 'Video Tutorial'
    },
    {
      title: 'Farmer Outreach & Soil Health Card Interpretation Worksheet',
      type: 'Worksheet / Template',
      size: '1.2 MB',
      description: 'Interactive worksheet for students to explain Soil Health Card recommendations to local farmers.',
      pages: '8 pages'
    }
  ];

  return (
    <div className="shc-page-container">
      <Breadcrumb title="School Library" />

      <main className="shc-main-content">
        <div className="shc-page-header-standard">
          <h1>School Soil Health Learning Library</h1>
          <p>Download educational modules, practical lab manuals, and audio-visual guides designed for students and school science teachers.</p>
        </div>

        <div className="shc-library-grid">
          {libraryItems.map((item, idx) => (
            <div key={idx} className="shc-library-card">
              <div className="shc-lib-icon-box">
                {item.type.includes('Video') ? <Video size={24} /> : <FileText size={24} />}
              </div>
              <div className="shc-lib-info">
                <span className="shc-lib-tag">{item.type}</span>
                <h3 className="shc-lib-title">{item.title}</h3>
                <p className="shc-lib-desc">{item.description}</p>
                <div className="shc-lib-footer">
                  <span className="shc-lib-size">{item.size} • {item.pages}</span>
                  <button type="button" className="shc-btn-secondary small">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
