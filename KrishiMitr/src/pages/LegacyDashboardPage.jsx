import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { CYCLE_SUMMARY, STATE_PROGRESS } from '../services/statsService';
import { Table, BarChart2, Download, CheckCircle, Search, ArrowUpDown } from 'lucide-react';

export default function LegacyDashboardPage() {
  const [selectedCycle, setSelectedCycle] = useState('cycle1');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'chart'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const filteredStates = STATE_PROGRESS.filter(item => 
    item.state.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    return sortAsc ? a.state.localeCompare(b.state) : b.state.localeCompare(a.state);
  });

  const handleExportCSV = () => {
    const headers = ['State', 'Target for Sample Collection', 'Samples Collected', 'Completion %', 'Samples Tested', 'SHC Printed', 'SHC Dispatched'];
    const rows = filteredStates.map(s => [
      `"${s.state}"`,
      `"${s.target}"`,
      `"${s.collected}"`,
      `"${s.pct}"`,
      `"${s.tested}"`,
      `"${s.printed}"`,
      `"${s.dispatched}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soil_health_card_${selectedCycle}_progress.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="shc-page-container">
      <Breadcrumb title="Legacy Dashboard" />

      <main className="shc-main-content">
        {/* National Macro Summary Comparison Table */}
        <div className="shc-dashboard-section">
          <div className="shc-table-responsive">
            <table className="shc-macro-summary-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Metric Indicator</th>
                  <th style={{ width: '30%' }}>Cycle I (2015 to 2017)</th>
                  <th style={{ width: '30%' }}>Cycle II (2017 to 2019)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Target for Sample Collection</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle1.targetCollection}</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle2.targetCollection}</td>
                </tr>
                <tr>
                  <td>Sample Collected</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle1.sampleCollected}</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle2.sampleCollected}</td>
                </tr>
                <tr>
                  <td>Sample Tested</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle1.sampleTested}</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle2.sampleTested}</td>
                </tr>
                <tr>
                  <td>Target for SHC Printing</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle1.targetPrinting}</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle2.targetPrinting}</td>
                </tr>
                <tr>
                  <td>SHC Printed</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle1.shcPrinted}</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle2.shcPrinted}</td>
                </tr>
                <tr>
                  <td>SHC Dispatched</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle1.shcDispatched}</td>
                  <td className="text-center bold">{CYCLE_SUMMARY.cycle2.shcDispatched}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Filter & View Controls */}
        <div className="shc-dashboard-controls-bar">
          <div className="shc-dashboard-cycle-select">
            <label className="shc-floating-label">Select Cycle</label>
            <select
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
              className="shc-select"
            >
              <option value="cycle1">Cycle I (2015 to 2017)</option>
              <option value="cycle2">Cycle II (2017 to 2019)</option>
            </select>
          </div>

          <div className="shc-dashboard-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search State / UT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shc-text-input small"
            />
          </div>

          <div className="shc-dashboard-actions-right">
            <div className="shc-view-toggle">
              <span className="shc-view-label">View</span>
              <button
                type="button"
                className={`shc-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table View"
                aria-label="Table View"
              >
                <Table size={18} />
              </button>
              <button
                type="button"
                className={`shc-toggle-btn ${viewMode === 'chart' ? 'active' : ''}`}
                onClick={() => setViewMode('chart')}
                title="Chart View"
                aria-label="Chart View"
              >
                <BarChart2 size={18} />
              </button>
            </div>

            <button type="button" className="shc-export-btn" onClick={handleExportCSV}>
              <span>EXPORT</span>
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* State-wise Data View */}
        {viewMode === 'table' ? (
          <div className="shc-table-responsive shc-state-progress-table-wrap">
            <table className="shc-data-table">
              <thead>
                <tr>
                  <th onClick={() => setSortAsc(!sortAsc)} className="sortable">
                    <div className="th-flex">
                      <span>State / UT</span>
                      <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th>Target for Sample Collection</th>
                  <th>Samples Collected</th>
                  <th>Samples Tested</th>
                  <th>SHC Printed</th>
                  <th>SHC Dispatched</th>
                </tr>
              </thead>
              <tbody>
                {filteredStates.map((row) => (
                  <tr key={row.state}>
                    <td className="bold">{row.state}</td>
                    <td className="text-center">{row.target}</td>
                    <td className="text-center">
                      <div className="progress-cell">
                        <span>{row.collected}</span>
                        <span className="shc-target-badge">
                          <CheckCircle size={12} /> {row.pct} of Target
                        </span>
                      </div>
                    </td>
                    <td className="text-center">{row.tested}</td>
                    <td className="text-center">{row.printed}</td>
                    <td className="text-center">{row.dispatched}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="shc-chart-view-panel">
            <h3>State Progress Chart (Samples Collected vs Target)</h3>
            <div className="shc-bar-chart-container">
              {filteredStates.slice(0, 10).map((row) => (
                <div key={row.state} className="shc-chart-bar-row">
                  <span className="bar-label">{row.state}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: '100%' }}>
                      <span className="bar-val">{row.collected} (100%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
