import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { SCHOOL_DASHBOARD_METRICS } from '../services/statsService';
import { School, Users, MapPin, TestTubes, FileCheck2, Award } from 'lucide-react';

export default function SchoolDashboardPage() {
  const [activeTab, setActiveTab] = useState('state'); // 'state' | 'national'

  const schoolList = [
    { schoolName: 'Govt. Senior Secondary Model School, PAU, Ludhiana', state: 'Punjab', students: 480, samples: 320, shcGenerated: 180 },
    { schoolName: 'Kendriya Vidyalaya, IARI Pusa Campus, New Delhi', state: 'Delhi', students: 620, samples: 450, shcGenerated: 290 },
    { schoolName: 'Jawahar Navodaya Vidyalaya, Baramati', state: 'Maharashtra', students: 390, samples: 280, shcGenerated: 210 },
    { schoolName: 'Govt. Inter College, Bakshi Ka Talab, Lucknow', state: 'Uttar Pradesh', students: 510, samples: 380, shcGenerated: 240 },
    { schoolName: 'Mahatma Gandhi Govt. School, Jaipur', state: 'Rajasthan', students: 430, samples: 310, shcGenerated: 190 },
    { schoolName: 'Adarsh Vidyalaya, Anand', state: 'Gujarat', students: 370, samples: 260, shcGenerated: 175 }
  ];

  return (
    <div className="shc-page-container">
      <Breadcrumb title="School Dashboard" />

      <main className="shc-main-content">
        <div className="shc-school-intro-header">
          <h1>School Soil Health Programme</h1>
          <p>
            Engaging students and rural schools in participatory soil sample collection, laboratory science education, and farmer outreach.
          </p>
        </div>

        {/* 6 Metric Summary Cards matching reference */}
        <div className="shc-metric-cards-grid">
          <div className="shc-metric-card">
            <div className="shc-metric-icon-wrap green">
              <School size={24} />
            </div>
            <div className="shc-metric-val">{SCHOOL_DASHBOARD_METRICS.schoolsRegistered}</div>
            <div className="shc-metric-label">Registered Schools</div>
          </div>

          <div className="shc-metric-card">
            <div className="shc-metric-icon-wrap blue">
              <MapPin size={24} />
            </div>
            <div className="shc-metric-val">{SCHOOL_DASHBOARD_METRICS.statesCovered}</div>
            <div className="shc-metric-label">States / UTs Covered</div>
          </div>

          <div className="shc-metric-card">
            <div className="shc-metric-icon-wrap purple">
              <Users size={24} />
            </div>
            <div className="shc-metric-val">{SCHOOL_DASHBOARD_METRICS.studentsEngaged}</div>
            <div className="shc-metric-label">Students Engaged</div>
          </div>

          <div className="shc-metric-card">
            <div className="shc-metric-icon-wrap orange">
              <Award size={24} />
            </div>
            <div className="shc-metric-val">{SCHOOL_DASHBOARD_METRICS.farmersReached}</div>
            <div className="shc-metric-label">Farmers Reached</div>
          </div>

          <div className="shc-metric-card">
            <div className="shc-metric-icon-wrap teal">
              <TestTubes size={24} />
            </div>
            <div className="shc-metric-val">{SCHOOL_DASHBOARD_METRICS.samplesCollected}</div>
            <div className="shc-metric-label">Samples Collected</div>
          </div>

          <div className="shc-metric-card">
            <div className="shc-metric-icon-wrap primary">
              <FileCheck2 size={24} />
            </div>
            <div className="shc-metric-val">{SCHOOL_DASHBOARD_METRICS.shcGenerated}</div>
            <div className="shc-metric-label">SHCs Generated</div>
          </div>
        </div>

        {/* Tab Controls: STATE-WISE and NATION-WISE */}
        <div className="shc-school-tabs-wrap">
          <div className="shc-school-tabs">
            <button
              type="button"
              className={`shc-school-tab ${activeTab === 'state' ? 'active' : ''}`}
              onClick={() => setActiveTab('state')}
            >
              STATE-WISE
            </button>
            <button
              type="button"
              className={`shc-school-tab ${activeTab === 'national' ? 'active' : ''}`}
              onClick={() => setActiveTab('national')}
            >
              NATION-WISE
            </button>
          </div>
        </div>

        {/* Activity Table */}
        <div className="shc-table-responsive shc-school-table-wrap">
          <table className="shc-data-table">
            <thead>
              <tr>
                <th>School Name / Institution</th>
                <th>State</th>
                <th>Students Trained</th>
                <th>Field Samples Tested</th>
                <th>SHC Issued to Farmers</th>
                <th>Program Status</th>
              </tr>
            </thead>
            <tbody>
              {schoolList.map((item, idx) => (
                <tr key={idx}>
                  <td><strong>{item.schoolName}</strong></td>
                  <td>{item.state}</td>
                  <td className="text-center">{item.students}</td>
                  <td className="text-center">{item.samples}</td>
                  <td className="text-center bold">{item.shcGenerated}</td>
                  <td className="text-center">
                    <span className="shc-status-badge high">Active Lab</span>
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
