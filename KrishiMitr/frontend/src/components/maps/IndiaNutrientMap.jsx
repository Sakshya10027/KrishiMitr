import React, { useState, useMemo } from 'react';
import { 
  Layers, Info, MapPin, ArrowLeft, ArrowRight, Search, 
  Table, LayoutGrid, Download, ExternalLink, ShieldCheck, 
  FlaskConical, BookOpen, Building2 
} from 'lucide-react';
import indiaMapData from './indiaMapData';
import { 
  getStateDistrictsNutrientData, 
  getDistrictNutrientData, 
  getDistrictBlocksNutrientData,
  OFFICIAL_SOURCES, 
  STATES_AND_DISTRICTS 
} from '../../services/districtNutrientService';

const NUTRIENT_LAYERS = [
  { id: 'N', name: 'Available Nitrogen (N)', unit: 'kg/ha' },
  { id: 'P', name: 'Available Phosphorus (P)', unit: 'kg/ha' },
  { id: 'K', name: 'Available Potassium (K)', unit: 'kg/ha' },
  { id: 'OC', name: 'Organic Carbon (OC)', unit: '%' },
  { id: 'pH', name: 'Soil pH Reaction', unit: 'pH' },
  { id: 'Zn', name: 'Zinc (Zn)', unit: 'ppm' },
  { id: 'S', name: 'Available Sulphur (S)', unit: 'ppm' }
];

// National State Baseline Data (Cycle - II)
const STATE_NUTRIENT_DATA = {
  'Andaman and Nicobar Islands': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Potassium' },
  'Andhra Pradesh': { N: 'Low', P: 'High', K: 'High', OC: 'Medium', pH: 'Alkaline', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Zinc & Nitrogen' },
  'Arunachal Pradesh': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Soil Acidity' },
  'Assam': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Lime Requirement' },
  'Bihar': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Zinc, Boron & Nitrogen' },
  'Chandigarh': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Nitrogen & Zinc' },
  'Chhattisgarh': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Nitrogen, Phosphorus & Boron' },
  'Dadra and Nagar Haveli': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Zinc & Nitrogen' },
  'Daman and Diu': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Nitrogen & Zinc' },
  'Delhi': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Zinc & Nitrogen' },
  'Goa': { N: 'Medium', P: 'Low', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient', dominantDeficiency: 'Calcium, Magnesium & Phosphorus' },
  'Gujarat': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Medium', S: 'Deficient', dominantDeficiency: 'Nitrogen & Zinc' },
  'Haryana': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Zinc & Nitrogen' },
  'Himachal Pradesh': { N: 'Medium', P: 'Medium', K: 'High', OC: 'High', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Nitrogen & Zinc' },
  'Jammu and Kashmir': { N: 'Medium', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Zinc & Boron' },
  'Jharkhand': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Phosphorus & Zinc' },
  'Karnataka': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Zinc & Boron' },
  'Kerala': { N: 'Medium', P: 'High', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient', dominantDeficiency: 'Potassium & Calcium' },
  'Lakshadweep': { N: 'Low', P: 'Low', K: 'Low', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Macro & Micronutrients' },
  'Madhya Pradesh': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Deficient', dominantDeficiency: 'Phosphorus & Sulphur' },
  'Maharashtra': { N: 'Low', P: 'High', K: 'High', OC: 'Medium', pH: 'Alkaline', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Iron & Zinc' },
  'Manipur': { N: 'High', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Boron' },
  'Meghalaya': { N: 'High', P: 'Low', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Potassium' },
  'Mizoram': { N: 'High', P: 'Low', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Lime Requirement' },
  'Nagaland': { N: 'High', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Acidity' },
  'Odisha': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', S: 'Deficient', dominantDeficiency: 'Boron & Phosphorus' },
  'Puducherry': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Zinc & Organic Carbon' },
  'Punjab': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Nitrogen, Zinc & Organic Carbon' },
  'Rajasthan': { N: 'Low', P: 'Low', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Nitrogen & Phosphorus' },
  'Sikkim': { N: 'High', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient', dominantDeficiency: 'Available Phosphorus' },
  'Tamil Nadu': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient', dominantDeficiency: 'Zinc & Organic Carbon' },
  'Telangana': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Medium', S: 'Deficient', dominantDeficiency: 'Nitrogen & Zinc' },
  'Tripura': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Potassium' },
  'Uttar Pradesh': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Neutral', Zn: 'Medium', S: 'Deficient', dominantDeficiency: 'Organic Carbon & Nitrogen' },
  'Uttarakhand': { N: 'Medium', P: 'Medium', K: 'High', OC: 'High', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Zinc' },
  'West Bengal': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient', dominantDeficiency: 'Phosphorus & Lime requirement' }
};

export default function IndiaNutrientMap({ cycleTitle = 'Cycle - II (2017 to 2019)' }) {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState('national'); // 'national' | 'district'
  const [activeNutrient, setActiveNutrient] = useState('N');
  
  // Selection
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Agra');
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  
  // District View Options: 'map' (Block GIS Map) | 'grid' (Districts Cards) | 'table' (Tabular)
  const [districtSearch, setDistrictSearch] = useState('');
  const [districtViewType, setDistrictViewType] = useState('map'); 

  // Colors
  const getColorForStatus = (status) => {
    if (status === 'Low' || status === 'Acidic' || status === 'Deficient') return '#d32f2f'; // Red
    if (status === 'Medium') return '#ed6c02'; // Orange / Amber
    if (status === 'High' || status === 'Neutral' || status === 'Normal' || status === 'Sufficient') return '#2e7d32'; // Green
    if (status === 'Alkaline' || status === 'Saline') return '#1976d2'; // Blue
    return '#9e9e9e';
  };

  // State status lookup helper
  const getStateStatus = (stateName, nutrientId) => {
    const data = STATE_NUTRIENT_DATA[stateName];
    if (data && data[nutrientId]) return data[nutrientId];
    return 'Medium';
  };

  // State Districts dataset
  const stateDistricts = useMemo(() => {
    return getStateDistrictsNutrientData(selectedState);
  }, [selectedState]);

  // Filtered districts based on user search
  const filteredDistricts = useMemo(() => {
    if (!districtSearch.trim()) return stateDistricts;
    return stateDistricts.filter(d => 
      d.district.toLowerCase().includes(districtSearch.trim().toLowerCase())
    );
  }, [stateDistricts, districtSearch]);

  // Current active inspected district data
  const activeDistrictData = useMemo(() => {
    return getDistrictNutrientData(selectedState, selectedDistrict);
  }, [selectedState, selectedDistrict]);

  // Block spatial nutrient data for selected district
  const districtBlocksData = useMemo(() => {
    return getDistrictBlocksNutrientData(selectedState, selectedDistrict);
  }, [selectedState, selectedDistrict]);

  // Current active inspected block
  const activeBlockData = useMemo(() => {
    if (!districtBlocksData || !districtBlocksData.blocks || districtBlocksData.blocks.length === 0) return null;
    if (selectedBlockId) {
      const found = districtBlocksData.blocks.find(b => b.id === selectedBlockId);
      if (found) return found;
    }
    return districtBlocksData.blocks[0] || null;
  }, [districtBlocksData, selectedBlockId]);

  // Helper for block status
  const getBlockStatus = (block, nutrientId) => {
    if (!block) return 'Medium';
    if (nutrientId === 'pH') return block.pH_status;
    if (nutrientId === 'OC') return block.OC_status;
    if (nutrientId === 'Zn') return block.Zn_status;
    if (nutrientId === 'S') return block.S_status;
    return block[`${nutrientId}_status`] || 'Medium';
  };

  // Helper for block display value
  const getBlockValDisplay = (block, nutrientId) => {
    if (!block) return '';
    if (nutrientId === 'pH') return `${block.pH} pH`;
    if (nutrientId === 'OC') return `${block.OC}%`;
    if (nutrientId === 'Zn') return `${block.Zn} ppm`;
    if (nutrientId === 'S') return `${block.S} ppm`;
    return `${block[nutrientId]} kg/ha`;
  };

  // Handle drill down to district view
  const handleDrilldown = (stateName) => {
    setSelectedState(stateName);
    const available = STATES_AND_DISTRICTS[stateName] || [];
    if (available.length > 0) {
      setSelectedDistrict(available[0]);
    }
    setSelectedBlockId(null);
    setDistrictViewType('map'); // Open visual district map immediately
    setViewMode('district');
  };


  // Export district data to CSV
  const handleExportCSV = () => {
    const headers = ['District', 'State', 'Nitrogen (N kg/ha)', 'N Rating', 'Phosphorus (P kg/ha)', 'P Rating', 'Potassium (K kg/ha)', 'K Rating', 'Organic Carbon (%)', 'OC Rating', 'Soil pH', 'pH Rating', 'Zinc (ppm)', 'Zn Status', 'Sulphur (ppm)', 'S Status', 'Samples Tested', 'Cards Dispatched'];
    const rows = stateDistricts.map(d => [
      `"${d.district}"`,
      `"${d.state}"`,
      d.N, d.N_status,
      d.P, d.P_status,
      d.K, d.K_status,
      d.OC, d.OC_status,
      d.pH, d.pH_status,
      d.Zn, d.Zn_status,
      d.S, d.S_status,
      `"${d.samplesTested}"`,
      `"${d.cardsDispatched}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Soil_Nutrient_Data_${selectedState.replace(/\s+/g, '_')}_Cycle_II.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stateData = STATE_NUTRIENT_DATA[selectedState] || STATE_NUTRIENT_DATA['Uttar Pradesh'];

  return (
    <div className="shc-map-container">
      {/* Top Level Mode Switcher */}
      <div className="shc-map-mode-toggle">
        <button
          type="button"
          className={`shc-mode-btn ${viewMode === 'national' ? 'active' : ''}`}
          onClick={() => setViewMode('national')}
        >
          <MapPin size={16} />
          <span>National State Map (36 States & UTs)</span>
        </button>
        <button
          type="button"
          className={`shc-mode-btn ${viewMode === 'district' ? 'active' : ''}`}
          onClick={() => setViewMode('district')}
        >
          <Layers size={16} />
          <span>District-Level Nutrient Map & Explorer</span>
        </button>
      </div>

      {/* VIEW MODE 1: NATIONAL MAP VIEW */}
      {viewMode === 'national' && (
        <>
          <div className="shc-map-header">
            <div className="shc-map-title">
              <h3>Interactive Nutrient Fertility Map (National Overview)</h3>
              <span>{cycleTitle} — Department of Agriculture & Farmers Welfare, GoI</span>
            </div>

            {/* Nutrient Layer Selector */}
            <div className="shc-map-layers">
              {NUTRIENT_LAYERS.map(n => (
                <button
                  key={n.id}
                  type="button"
                  className={`shc-layer-btn ${activeNutrient === n.id ? 'active' : ''}`}
                  onClick={() => setActiveNutrient(n.id)}
                >
                  <Layers size={14} />
                  <span>{n.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="shc-map-content-grid">
            {/* Real Geographic SVG Map */}
            <div className="shc-map-visual">
              <div style={{ position: 'relative' }}>
                {hoveredState && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(0, 0, 0, 0.85)',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      zIndex: 10,
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <MapPin size={13} style={{ color: '#ffd600' }} />
                    <span><strong>{hoveredState}</strong>: {activeNutrient} is <strong>{getStateStatus(hoveredState, activeNutrient)}</strong></span>
                  </div>
                )}

                <svg 
                  viewBox={indiaMapData.viewBox || "0 0 612 696"} 
                  className="shc-india-svg"
                  style={{ display: 'block', margin: '0 auto', maxHeight: '560px' }}
                >
                  <defs>
                    <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25"/>
                    </filter>
                  </defs>

                  <g id="states-group">
                    {indiaMapData.locations.map(loc => {
                      const stateStatus = getStateStatus(loc.name, activeNutrient);
                      const isSelected = selectedState.toLowerCase() === loc.name.toLowerCase();
                      const fillColor = getColorForStatus(stateStatus);

                      return (
                        <path
                          key={loc.id}
                          id={loc.id}
                          d={loc.path}
                          fill={fillColor}
                          stroke={isSelected ? '#ffd600' : '#ffffff'}
                          strokeWidth={isSelected ? '2.5' : '0.8'}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          onClick={() => {
                            setSelectedState(loc.name);
                            const dists = STATES_AND_DISTRICTS[loc.name] || [];
                            if (dists.length > 0) setSelectedDistrict(dists[0]);
                          }}
                          onMouseEnter={() => setHoveredState(loc.name)}
                          onMouseLeave={() => setHoveredState(null)}
                          className={`shc-state-path ${isSelected ? 'selected' : ''}`}
                          style={{
                            cursor: 'pointer',
                            filter: isSelected ? 'url(#mapGlow)' : 'none',
                            transition: 'stroke 0.2s, stroke-width 0.2s'
                          }}
                        >
                          <title>{`${loc.name}: ${activeNutrient} is ${stateStatus}`}</title>
                        </path>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Map Legend */}
              <div className="shc-map-legend">
                <span className="shc-legend-title">Fertility Status Legend:</span>
                <div className="shc-legend-items">
                  <span className="shc-legend-item"><span className="shc-legend-color low" /> Low Deficient</span>
                  <span className="shc-legend-item"><span className="shc-legend-color medium" /> Medium</span>
                  <span className="shc-legend-item"><span className="shc-legend-color high" /> High / Sufficient</span>
                  <span className="shc-legend-item"><span className="shc-legend-color alkaline" /> Alkaline / Normal</span>
                </div>
              </div>
            </div>

            {/* State Nutrient Card Sidebar */}
            <div className="shc-map-details-sidebar">
              <div className="shc-state-card">
                <div className="shc-state-card-header">
                  <h4>{selectedState}</h4>
                  <span className="shc-state-badge">Click state to inspect fertility summary</span>
                </div>

                <div className="shc-state-nutrient-list">
                  <div className="shc-state-nutrient-row">
                    <span>Available Nitrogen (N):</span>
                    <strong className={`status-${stateData.N.toLowerCase()}`}>{stateData.N}</strong>
                  </div>
                  <div className="shc-state-nutrient-row">
                    <span>Available Phosphorus (P):</span>
                    <strong className={`status-${stateData.P.toLowerCase()}`}>{stateData.P}</strong>
                  </div>
                  <div className="shc-state-nutrient-row">
                    <span>Available Potassium (K):</span>
                    <strong className={`status-${stateData.K.toLowerCase()}`}>{stateData.K}</strong>
                  </div>
                  <div className="shc-state-nutrient-row">
                    <span>Organic Carbon (OC):</span>
                    <strong className={`status-${stateData.OC.toLowerCase()}`}>{stateData.OC}</strong>
                  </div>
                  <div className="shc-state-nutrient-row">
                    <span>Soil Reaction (pH):</span>
                    <strong className={`status-${stateData.pH.toLowerCase()}`}>{stateData.pH}</strong>
                  </div>
                  <div className="shc-state-nutrient-row">
                    <span>Available Zinc (Zn):</span>
                    <strong className={`status-${stateData.Zn.toLowerCase()}`}>{stateData.Zn}</strong>
                  </div>
                </div>

                <div className="shc-state-advisory">
                  <div className="shc-state-advisory-title">
                    <Info size={16} />
                    <strong>Dominant Soil Limitations:</strong>
                  </div>
                  <p>{stateData.dominantDeficiency}</p>
                </div>

                {/* Direct Drilldown Button */}
                <button
                  type="button"
                  onClick={() => handleDrilldown(selectedState)}
                  className="shc-drilldown-action-btn"
                >
                  <span>Explore District Nutrient Map ({stateDistricts.length} Districts)</span>
                  <ArrowRight size={16} />
                </button>

                <div className="shc-state-quick-select" style={{ marginTop: '16px' }}>
                  <label>Select State directly:</label>
                  <select 
                    value={selectedState} 
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      const dists = STATES_AND_DISTRICTS[e.target.value] || [];
                      if (dists.length > 0) setSelectedDistrict(dists[0]);
                    }}
                    className="shc-select"
                  >
                    {Object.keys(STATE_NUTRIENT_DATA).sort().map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIEW MODE 2: DISTRICT LEVEL MAP & EXPLORER */}
      {viewMode === 'district' && (
        <div className="shc-district-section">
          {/* Header Bar */}
          <div className="shc-district-header-bar">
            <div className="shc-district-title-left">
              <button 
                type="button" 
                onClick={() => setViewMode('national')}
                className="shc-back-btn"
              >
                <ArrowLeft size={16} />
                <span>Back to National Map</span>
              </button>
              <div className="shc-district-state-heading">
                <h4>{selectedState} — District Nutrient Fertility Explorer</h4>
                <span>Showing official Cycle - II laboratory soil sample analytics for all {stateDistricts.length} districts</span>
              </div>
            </div>

            <div className="shc-district-tools-right">
              {/* Quick State Switcher */}
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  const dists = STATES_AND_DISTRICTS[e.target.value] || [];
                  if (dists.length > 0) setSelectedDistrict(dists[0]);
                }}
                className="shc-select"
                style={{ width: '180px', padding: '8px 10px', fontSize: '0.85rem' }}
              >
                {Object.keys(STATES_AND_DISTRICTS).sort().map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              {/* District Search Filter */}
              <div className="shc-district-search-wrap">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search district name..."
                  value={districtSearch}
                  onChange={(e) => setDistrictSearch(e.target.value)}
                  className="shc-district-search-input"
                />
              </div>

              {/* View Switcher: Map vs Grid vs Table */}
              <div className="shc-view-switch-btns">
                <button
                  type="button"
                  className={`shc-view-switch-btn ${districtViewType === 'map' ? 'active' : ''}`}
                  onClick={() => setDistrictViewType('map')}
                  title="Interactive District Block Map"
                >
                  <MapPin size={15} />
                  <span>District Map</span>
                </button>
                <button
                  type="button"
                  className={`shc-view-switch-btn ${districtViewType === 'grid' ? 'active' : ''}`}
                  onClick={() => setDistrictViewType('grid')}
                  title="Grid Cards View"
                >
                  <LayoutGrid size={15} />
                  <span>All Districts ({stateDistricts.length})</span>
                </button>
                <button
                  type="button"
                  className={`shc-view-switch-btn ${districtViewType === 'table' ? 'active' : ''}`}
                  onClick={() => setDistrictViewType('table')}
                  title="Tabular View"
                >
                  <Table size={15} />
                  <span>Table</span>
                </button>
              </div>

              {/* CSV Export Button */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="shc-btn-secondary"
                style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                title="Download CSV report for this state"
              >
                <Download size={14} style={{ marginRight: '4px' }} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* District Nutrient Layer Filter Tabs */}
          <div className="shc-map-layers" style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#334155', alignSelf: 'center', marginRight: '6px' }}>
              Color Map/Grid by Parameter:
            </span>
            {NUTRIENT_LAYERS.map(n => (
              <button
                key={n.id}
                type="button"
                className={`shc-layer-btn ${activeNutrient === n.id ? 'active' : ''}`}
                onClick={() => setActiveNutrient(n.id)}
              >
                <Layers size={14} />
                <span>{n.name}</span>
              </button>
            ))}
          </div>

          <div className="shc-map-content-grid">
            {/* Left: District Display Area (Map OR Cards Grid OR Table) */}
            <div>
              {/* VIEW 1: DISTRICT SPATIAL NUTRIENT MAP (DEFAULT) */}
              {districtViewType === 'map' && (
                <div className="shc-district-map-card">
                  {/* Map Header with District Switcher & Badges */}
                  <div className="shc-district-map-topbar">
                    <div className="shc-district-map-title-wrap">
                      <h4>
                        <MapPin size={18} style={{ color: '#018840' }} />
                        <span>{selectedDistrict} District Soil Nutrient Map</span>
                      </h4>
                      <span>
                        Block-level spatial fertility distribution • Cycle-II (2017–2019) • DA&FW, GoI
                      </span>
                    </div>

                    <div className="shc-district-map-controls">
                      {/* Direct District Selector Dropdown */}
                      <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>
                        District:
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          setSelectedBlockId(null);
                        }}
                        className="shc-select"
                        style={{ width: '160px', padding: '6px 10px', fontSize: '0.84rem' }}
                      >
                        {stateDistricts.map(d => (
                          <option key={d.district} value={d.district}>{d.district}</option>
                        ))}
                      </select>

                      <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: '700', padding: '4px 9px', borderRadius: '4px' }}>
                        {districtBlocksData.totalBlocks} Blocks
                      </span>

                      <span style={{ background: '#f1f5f9', color: '#334155', fontSize: '0.75rem', fontWeight: '700', padding: '4px 9px', borderRadius: '4px' }}>
                        Layer: {NUTRIENT_LAYERS.find(n => n.id === activeNutrient)?.name.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* Visual SVG Map Canvas */}
                  <div className="shc-district-map-svg-wrap">
                    {/* Hover HUD Tooltip */}
                    {hoveredBlock && (
                      <div className="shc-district-map-hud">
                        <MapPin size={15} style={{ color: '#ffd600', flexShrink: 0 }} />
                        <div>
                          <strong>{hoveredBlock.fullName}</strong> ({selectedDistrict}): {activeNutrient} is{' '}
                          <span 
                            style={{ 
                              color: getColorForStatus(getBlockStatus(hoveredBlock, activeNutrient)),
                              fontWeight: '700' 
                            }}
                          >
                            {getBlockValDisplay(hoveredBlock, activeNutrient)} ({getBlockStatus(hoveredBlock, activeNutrient)})
                          </span>
                          <span style={{ marginLeft: '8px', opacity: 0.85, fontSize: '0.75rem' }}>
                            • Soil: {hoveredBlock.soilType}
                          </span>
                        </div>
                      </div>
                    )}

                    <svg
                      viewBox={districtBlocksData.viewBox || "0 0 620 500"}
                      className="shc-district-svg"
                    >
                      <defs>
                        <filter id="blockGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.5"/>
                        </filter>
                      </defs>

                      <g id="district-blocks-group">
                        {districtBlocksData.blocks.map(block => {
                          const bStatus = getBlockStatus(block, activeNutrient);
                          const isSelected = activeBlockData && activeBlockData.id === block.id;
                          const fillColor = getColorForStatus(bStatus);

                          return (
                            <g key={block.id}>
                              <path
                                id={block.id}
                                d={block.path}
                                fill={fillColor}
                                stroke={isSelected ? '#ffd600' : '#ffffff'}
                                strokeWidth={isSelected ? '3.5' : '1.5'}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                className={`shc-block-path ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedBlockId(block.id)}
                                onMouseEnter={() => setHoveredBlock(block)}
                                onMouseLeave={() => setHoveredBlock(null)}
                              >
                                <title>{`${block.fullName}: ${activeNutrient} is ${getBlockValDisplay(block, activeNutrient)} (${bStatus})`}</title>
                              </path>

                              {/* Primary Block Name Label */}
                              <text
                                x={block.center.x}
                                y={block.center.y - 4}
                                textAnchor="middle"
                                className="shc-block-text"
                              >
                                {block.name}
                              </text>

                              {/* Secondary Nutrient Reading Label */}
                              <text
                                x={block.center.x}
                                y={block.center.y + 11}
                                textAnchor="middle"
                                className="shc-block-subtext"
                              >
                                {getBlockValDisplay(block, activeNutrient)}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    </svg>
                  </div>

                  {/* Map Legend */}
                  <div className="shc-map-legend" style={{ marginTop: '12px' }}>
                    <span className="shc-legend-title">Fertility Rating:</span>
                    <div className="shc-legend-items">
                      <span className="shc-legend-item"><span className="shc-legend-color low" /> Low / Deficient / Acidic</span>
                      <span className="shc-legend-item"><span className="shc-legend-color medium" /> Medium</span>
                      <span className="shc-legend-item"><span className="shc-legend-color high" /> High / Sufficient / Neutral</span>
                      <span className="shc-legend-item"><span className="shc-legend-color alkaline" /> Alkaline / Normal</span>
                    </div>
                  </div>

                  {/* Summary Metric Stats Bar */}
                  <div className="shc-district-map-stats">
                    <div className="shc-map-stat-pill">
                      <span className="lbl">Selected Block:</span>
                      <span className="val" style={{ color: '#018840' }}>
                        {activeBlockData ? activeBlockData.fullName : 'Click any block'}
                      </span>
                    </div>

                    <div className="shc-map-stat-pill">
                      <span className="lbl">Mean District {activeNutrient}:</span>
                      <span className="val">
                        {activeNutrient === 'pH' 
                          ? activeDistrictData.pH 
                          : activeNutrient === 'OC' 
                          ? `${activeDistrictData.OC}%` 
                          : activeNutrient === 'Zn' 
                          ? `${activeDistrictData.Zn} ppm`
                          : activeNutrient === 'S' 
                          ? `${activeDistrictData.S} ppm`
                          : `${activeDistrictData[activeNutrient]} kg/ha`}
                      </span>
                    </div>

                    <div className="shc-map-stat-pill">
                      <span className="lbl">Deficient Blocks in {selectedDistrict}:</span>
                      <span className="val" style={{ color: '#d32f2f' }}>
                        {districtBlocksData.blocks.filter(b => {
                          const s = getBlockStatus(b, activeNutrient);
                          return s === 'Low' || s === 'Deficient' || s === 'Acidic';
                        }).length} of {districtBlocksData.totalBlocks} Blocks
                      </span>
                    </div>

                    <div className="shc-map-stat-pill">
                      <span className="lbl">Dominant Soil Series:</span>
                      <span className="val" style={{ fontSize: '0.8rem', color: '#475569' }}>
                        {activeBlockData ? activeBlockData.soilType : 'Alluvial Loam'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: CARDS GRID VIEW */}
              {districtViewType === 'grid' && (
                <div>
                  <div className="shc-district-cards-grid">
                    {filteredDistricts.map(dist => {
                      const isSelected = selectedDistrict.toLowerCase() === dist.district.toLowerCase();
                      const statusKey = activeNutrient === 'pH' 
                        ? dist.pH_status 
                        : activeNutrient === 'OC' 
                        ? dist.OC_status 
                        : activeNutrient === 'Zn' 
                        ? dist.Zn_status 
                        : activeNutrient === 'S' 
                        ? dist.S_status 
                        : dist[`${activeNutrient}_status`];
                      
                      const valDisplay = activeNutrient === 'pH'
                        ? dist.pH
                        : activeNutrient === 'OC'
                        ? `${dist.OC}%`
                        : activeNutrient === 'Zn'
                        ? `${dist.Zn} ppm`
                        : activeNutrient === 'S'
                        ? `${dist.S} ppm`
                        : `${dist[activeNutrient]} kg/ha`;

                      return (
                        <div
                          key={dist.district}
                          onClick={() => {
                            setSelectedDistrict(dist.district);
                            setSelectedBlockId(null);
                          }}
                          className={`shc-district-item-card status-border-${statusKey.toLowerCase()} ${isSelected ? 'selected' : ''}`}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span className="shc-district-card-title">{dist.district}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDistrict(dist.district);
                                  setSelectedBlockId(null);
                                  setDistrictViewType('map');
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#018840',
                                  fontSize: '0.74rem',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                              >
                                View Map 🗺️
                              </button>
                            </div>
                            <div className="shc-district-nutrient-value-row">
                              <span style={{ color: '#64748b' }}>{activeNutrient}: <strong>{valDisplay}</strong></span>
                              <span className={`shc-district-pill ${statusKey.toLowerCase()}`}>{statusKey}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredDistricts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '36px', background: '#fff', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                      <p style={{ color: '#64748b' }}>No districts found matching "{districtSearch}".</p>
                      <button onClick={() => setDistrictSearch('')} className="shc-btn-secondary" style={{ marginTop: '8px' }}>
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 3: DATA TABLE VIEW */}
              {districtViewType === 'table' && (
                <div className="shc-district-table-container">
                  <table className="shc-district-table">
                    <thead>
                      <tr>
                        <th>District</th>
                        <th>Action</th>
                        <th>Nitrogen (N)</th>
                        <th>Phosphorus (P)</th>
                        <th>Potassium (K)</th>
                        <th>Organic Carbon</th>
                        <th>Soil pH</th>
                        <th>Zinc (Zn)</th>
                        <th>Sulphur (S)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDistricts.map(dist => {
                        const isSelected = selectedDistrict.toLowerCase() === dist.district.toLowerCase();
                        return (
                          <tr 
                            key={dist.district}
                            onClick={() => {
                              setSelectedDistrict(dist.district);
                              setSelectedBlockId(null);
                            }}
                            className={isSelected ? 'selected' : ''}
                          >
                            <td><strong>{dist.district}</strong></td>
                            <td>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDistrict(dist.district);
                                  setSelectedBlockId(null);
                                  setDistrictViewType('map');
                                }}
                                className="shc-btn-primary"
                                style={{ padding: '3px 8px', fontSize: '0.74rem' }}
                              >
                                View Map
                              </button>
                            </td>
                            <td><span className={`status-${dist.N_status.toLowerCase()}`}>{dist.N} kg/ha ({dist.N_status})</span></td>
                            <td><span className={`status-${dist.P_status.toLowerCase()}`}>{dist.P} kg/ha ({dist.P_status})</span></td>
                            <td><span className={`status-${dist.K_status.toLowerCase()}`}>{dist.K} kg/ha ({dist.K_status})</span></td>
                            <td><span className={`status-${dist.OC_status.toLowerCase()}`}>{dist.OC}% ({dist.OC_status})</span></td>
                            <td><span className={`status-${dist.pH_status.toLowerCase()}`}>{dist.pH} ({dist.pH_status})</span></td>
                            <td><span className={`status-${dist.Zn_status.toLowerCase()}`}>{dist.Zn} ppm ({dist.Zn_status})</span></td>
                            <td><span className={`status-${dist.S_status.toLowerCase()}`}>{dist.S} ppm ({dist.S_status})</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Right: Comprehensive 12-Parameter District Details Card */}
            <div className="shc-map-details-sidebar">
              <div className="shc-state-card" style={{ borderColor: '#f59e0b', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                <div className="shc-state-card-header">
                  <h4>{activeDistrictData.district}</h4>
                  <span className="shc-state-badge">{activeDistrictData.state} District Soil Health Profile</span>
                </div>

                {/* Selected Block Spotlight Banner */}
                {activeBlockData && (
                  <div className="shc-selected-block-banner">
                    <div className="shc-selected-block-header">
                      <strong>📍 Selected: {activeBlockData.fullName}</strong>
                      <span className={`shc-district-pill ${getBlockStatus(activeBlockData, activeNutrient).toLowerCase()}`}>
                        {activeNutrient}: {getBlockStatus(activeBlockData, activeNutrient)}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#78350f', margin: '4px 0 8px 0', lineHeight: '1.4' }}>
                      <span><strong>{activeNutrient} Reading:</strong> {getBlockValDisplay(activeBlockData, activeNutrient)}</span>
                      <span style={{ margin: '0 6px' }}>•</span>
                      <span><strong>Soil Texture:</strong> {activeBlockData.soilType}</span>
                      <span style={{ margin: '0 6px' }}>•</span>
                      <span><strong>Primary Crops:</strong> {activeBlockData.dominantCrop}</span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: '#92400e', background: 'rgba(255,255,255,0.75)', padding: '6px 8px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <strong>Block STCR Fertilizer Guidance:</strong> {activeBlockData.recommendation}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', fontSize: '0.78rem', color: '#475569' }}>
                  <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                    <strong>{activeDistrictData.samplesTested}</strong> Samples Analyzed
                  </span>
                  <span style={{ background: '#f0fdf4', padding: '4px 8px', borderRadius: '4px', color: '#166534' }}>
                    <strong>{activeDistrictData.cardsDispatched}</strong> SHCs Issued
                  </span>
                </div>


                {/* 12-Parameter Micro Matrix */}
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155' }}>
                  Complete 12-Parameter Lab Analysis:
                </span>
                
                <div className="shc-district-12param-grid">
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Nitrogen (N)</span>
                    <span className="val">{activeDistrictData.N} kg/ha <small className={`status-${activeDistrictData.N_status.toLowerCase()}`}>({activeDistrictData.N_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Phosphorus (P)</span>
                    <span className="val">{activeDistrictData.P} kg/ha <small className={`status-${activeDistrictData.P_status.toLowerCase()}`}>({activeDistrictData.P_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Potassium (K)</span>
                    <span className="val">{activeDistrictData.K} kg/ha <small className={`status-${activeDistrictData.K_status.toLowerCase()}`}>({activeDistrictData.K_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Organic Carbon</span>
                    <span className="val">{activeDistrictData.OC}% <small className={`status-${activeDistrictData.OC_status.toLowerCase()}`}>({activeDistrictData.OC_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Soil pH Reaction</span>
                    <span className="val">{activeDistrictData.pH} <small className={`status-${activeDistrictData.pH_status.toLowerCase()}`}>({activeDistrictData.pH_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Electrical Cond.</span>
                    <span className="val">{activeDistrictData.EC} dS/m <small style={{ color: '#2e7d32' }}>({activeDistrictData.EC_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Zinc (Zn)</span>
                    <span className="val">{activeDistrictData.Zn} ppm <small className={`status-${activeDistrictData.Zn_status.toLowerCase()}`}>({activeDistrictData.Zn_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Sulphur (S)</span>
                    <span className="val">{activeDistrictData.S} ppm <small className={`status-${activeDistrictData.S_status.toLowerCase()}`}>({activeDistrictData.S_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Iron (Fe)</span>
                    <span className="val">{activeDistrictData.Fe} ppm <small style={{ color: '#2e7d32' }}>({activeDistrictData.Fe_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Boron (B)</span>
                    <span className="val">{activeDistrictData.B} ppm <small className={`status-${activeDistrictData.B_status.toLowerCase()}`}>({activeDistrictData.B_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Copper (Cu)</span>
                    <span className="val">{activeDistrictData.Cu} ppm <small style={{ color: '#2e7d32' }}>({activeDistrictData.Cu_status})</small></span>
                  </div>
                  <div className="shc-param-mini-badge">
                    <span className="lbl">Manganese (Mn)</span>
                    <span className="val">{activeDistrictData.Mn} ppm <small style={{ color: '#2e7d32' }}>({activeDistrictData.Mn_status})</small></span>
                  </div>
                </div>

                <div className="shc-state-advisory">
                  <div className="shc-state-advisory-title">
                    <Info size={16} />
                    <strong>Dominant Soil Limitations:</strong>
                  </div>
                  <p>{activeDistrictData.dominantConstraints}</p>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '10px 12px', fontSize: '0.8rem', color: '#166534' }}>
                  <strong>ICAR-STCR Fertilizer Dosage Guidance:</strong>
                  <p style={{ marginTop: '4px', margin: 0 }}>{activeDistrictData.stcrRecommendation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Data Sources & Academic Citations Block */}
      <div className="shc-citations-box">
        <div className="shc-citations-header">
          <div className="shc-citations-title-wrap">
            <Building2 size={22} style={{ color: '#018840' }} />
            <h4>Official Data Sources & Survey Methodology</h4>
          </div>
          <span className="shc-citations-badge">Validated Soil Science Standards</span>
        </div>

        <div className="shc-citations-grid">
          <div className="shc-citation-col">
            <strong>1. National Regulatory Body & Primary Portal:</strong>
            <p>
              {OFFICIAL_SOURCES.portal.authority}. Data synchronized with the official{' '}
              <a 
                href={OFFICIAL_SOURCES.portal.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="shc-citation-link"
              >
                Soil Health Card Portal ({OFFICIAL_SOURCES.portal.referenceCycle}) <ExternalLink size={12} />
              </a>.
            </p>
          </div>

          <div className="shc-citation-col">
            <strong>2. National Research & Testing Authority:</strong>
            <p>
              {OFFICIAL_SOURCES.researchBody.institute} in coordination with{' '}
              <em>{OFFICIAL_SOURCES.researchBody.programs.join(' and ')}</em>.{' '}
              <a 
                href={OFFICIAL_SOURCES.researchBody.citationUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="shc-citation-link"
              >
                ICAR-IISS e-Atlas Portal <ExternalLink size={12} />
              </a>.
            </p>
          </div>

          <div className="shc-citation-col">
            <strong>3. Sampling Protocol & Parameter Standardization:</strong>
            <p>
              Testing protocols follow standard GPS-tagged grid collection ({OFFICIAL_SOURCES.portal.surveyGrid}) across all 12 parameters (pH, EC, OC, N, P, K, S, Zn, Fe, Cu, Mn, B).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
