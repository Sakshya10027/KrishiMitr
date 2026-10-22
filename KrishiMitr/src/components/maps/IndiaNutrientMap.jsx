import React, { useState } from 'react';
import { Layers, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const NUTRIENT_LAYERS = [
  { id: 'N', name: 'Available Nitrogen (N)', unit: 'kg/ha' },
  { id: 'P', name: 'Available Phosphorus (P)', unit: 'kg/ha' },
  { id: 'K', name: 'Available Potassium (K)', unit: 'kg/ha' },
  { id: 'OC', name: 'Organic Carbon (OC)', unit: '%' },
  { id: 'pH', name: 'Soil pH Reaction', unit: 'pH' },
  { id: 'Zn', name: 'Zinc (Zn)', unit: 'ppm' }
];

const STATE_NUTRIENT_DATA = {
  'Punjab': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', dominantDeficiency: 'Nitrogen, Zinc & Organic Carbon' },
  'Haryana': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Alkaline', Zn: 'Low', dominantDeficiency: 'Zinc & Nitrogen' },
  'Uttar Pradesh': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Neutral', Zn: 'Medium', dominantDeficiency: 'Organic Carbon & Nitrogen' },
  'Rajasthan': { N: 'Low', P: 'Low', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', dominantDeficiency: 'Nitrogen & Phosphorus' },
  'Madhya Pradesh': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', dominantDeficiency: 'Phosphorus & Sulphur' },
  'Maharashtra': { N: 'Low', P: 'High', K: 'High', OC: 'Medium', pH: 'Alkaline', Zn: 'Medium', dominantDeficiency: 'Iron & Zinc' },
  'Gujarat': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Medium', dominantDeficiency: 'Nitrogen & Zinc' },
  'Bihar': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Neutral', Zn: 'Low', dominantDeficiency: 'Zinc & Boron' },
  'West Bengal': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', dominantDeficiency: 'Phosphorus & Lime requirement' },
  'Karnataka': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', dominantDeficiency: 'Zinc & Boron' },
  'Tamil Nadu': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', dominantDeficiency: 'Zinc & Organic Carbon' },
  'Andhra Pradesh': { N: 'Low', P: 'High', K: 'High', OC: 'Medium', pH: 'Alkaline', Zn: 'Medium', dominantDeficiency: 'Zinc & Nitrogen' },
  'Odisha': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', dominantDeficiency: 'Boron & Phosphorus' },
  'Kerala': { N: 'Medium', P: 'High', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'High', dominantDeficiency: 'Potassium & Calcium' }
};

export default function IndiaNutrientMap({ cycleTitle = 'Cycle - II (2017 to 2019)' }) {
  const [activeNutrient, setActiveNutrient] = useState('N');
  const [selectedState, setSelectedState] = useState('Punjab');

  const getColorForStatus = (status) => {
    if (status === 'Low' || status === 'Acidic') return '#d32f2f'; // Red
    if (status === 'Medium') return '#ed6c02'; // Orange / Amber
    if (status === 'High' || status === 'Neutral' || status === 'Normal') return '#2e7d32'; // Green
    if (status === 'Alkaline') return '#1976d2'; // Blue
    return '#9e9e9e';
  };

  const stateData = STATE_NUTRIENT_DATA[selectedState] || STATE_NUTRIENT_DATA['Punjab'];

  return (
    <div className="shc-map-container">
      {/* Map Control Header */}
      <div className="shc-map-header">
        <div className="shc-map-title">
          <h3>Interactive Nutrient Fertility Map</h3>
          <span>{cycleTitle}</span>
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
        {/* SVG Interactive Map Area */}
        <div className="shc-map-visual">
          <svg viewBox="0 0 650 720" className="shc-india-svg">
            <defs>
              <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
              </filter>
            </defs>

            {/* India States Outline Paths (Representative Cartographic Regions) */}
            <g id="states-group">
              {/* Jammu & Kashmir / Ladakh */}
              <path 
                d="M210 40 L280 20 L340 70 L330 130 L280 130 L220 100 Z" 
                fill="#81C784" 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Punjab')}
                className="shc-state-path"
              >
                <title>Jammu & Kashmir / Ladakh</title>
              </path>

              {/* Himachal Pradesh */}
              <path 
                d="M260 130 L310 130 L320 170 L280 180 L250 160 Z" 
                fill="#A5D6A7" 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Punjab')}
                className="shc-state-path"
              >
                <title>Himachal Pradesh</title>
              </path>

              {/* Punjab */}
              <path 
                d="M200 130 L260 130 L250 180 L200 180 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Punjab'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Punjab')}
                className={`shc-state-path ${selectedState === 'Punjab' ? 'selected' : ''}`}
              >
                <title>Punjab</title>
              </path>

              {/* Haryana & Delhi */}
              <path 
                d="M220 180 L260 180 L265 220 L225 220 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Haryana'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Haryana')}
                className={`shc-state-path ${selectedState === 'Haryana' ? 'selected' : ''}`}
              >
                <title>Haryana</title>
              </path>

              {/* Rajasthan */}
              <path 
                d="M130 180 L220 180 L220 270 L140 280 L110 220 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Rajasthan'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Rajasthan')}
                className={`shc-state-path ${selectedState === 'Rajasthan' ? 'selected' : ''}`}
              >
                <title>Rajasthan</title>
              </path>

              {/* Uttar Pradesh */}
              <path 
                d="M260 180 L380 200 L400 280 L280 270 L260 220 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Uttar Pradesh'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Uttar Pradesh')}
                className={`shc-state-path ${selectedState === 'Uttar Pradesh' ? 'selected' : ''}`}
              >
                <title>Uttar Pradesh</title>
              </path>

              {/* Bihar */}
              <path 
                d="M390 230 L470 230 L460 290 L390 280 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Bihar'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Bihar')}
                className={`shc-state-path ${selectedState === 'Bihar' ? 'selected' : ''}`}
              >
                <title>Bihar</title>
              </path>

              {/* West Bengal */}
              <path 
                d="M460 260 L500 260 L480 370 L440 350 L460 290 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['West Bengal'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('West Bengal')}
                className={`shc-state-path ${selectedState === 'West Bengal' ? 'selected' : ''}`}
              >
                <title>West Bengal</title>
              </path>

              {/* Madhya Pradesh */}
              <path 
                d="M200 270 L340 270 L360 360 L230 360 L180 310 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Madhya Pradesh'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Madhya Pradesh')}
                className={`shc-state-path ${selectedState === 'Madhya Pradesh' ? 'selected' : ''}`}
              >
                <title>Madhya Pradesh</title>
              </path>

              {/* Gujarat */}
              <path 
                d="M90 270 L180 280 L180 360 L110 370 L70 310 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Gujarat'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Gujarat')}
                className={`shc-state-path ${selectedState === 'Gujarat' ? 'selected' : ''}`}
              >
                <title>Gujarat</title>
              </path>

              {/* Maharashtra */}
              <path 
                d="M170 360 L310 360 L310 460 L190 460 L150 400 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Maharashtra'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Maharashtra')}
                className={`shc-state-path ${selectedState === 'Maharashtra' ? 'selected' : ''}`}
              >
                <title>Maharashtra</title>
              </path>

              {/* Odisha */}
              <path 
                d="M360 330 L450 330 L430 420 L350 400 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Odisha'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Odisha')}
                className={`shc-state-path ${selectedState === 'Odisha' ? 'selected' : ''}`}
              >
                <title>Odisha</title>
              </path>

              {/* Andhra Pradesh & Telangana */}
              <path 
                d="M260 440 L370 420 L350 540 L260 520 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Andhra Pradesh'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Andhra Pradesh')}
                className={`shc-state-path ${selectedState === 'Andhra Pradesh' ? 'selected' : ''}`}
              >
                <title>Andhra Pradesh / Telangana</title>
              </path>

              {/* Karnataka */}
              <path 
                d="M190 460 L270 460 L260 580 L200 570 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Karnataka'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Karnataka')}
                className={`shc-state-path ${selectedState === 'Karnataka' ? 'selected' : ''}`}
              >
                <title>Karnataka</title>
              </path>

              {/* Tamil Nadu */}
              <path 
                d="M230 560 L290 550 L270 670 L220 660 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Tamil Nadu'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Tamil Nadu')}
                className={`shc-state-path ${selectedState === 'Tamil Nadu' ? 'selected' : ''}`}
              >
                <title>Tamil Nadu</title>
              </path>

              {/* Kerala */}
              <path 
                d="M190 580 L230 580 L220 670 L180 640 Z" 
                fill={getColorForStatus(STATE_NUTRIENT_DATA['Kerala'][activeNutrient])} 
                stroke="#ffffff" 
                strokeWidth="2"
                onClick={() => setSelectedState('Kerala')}
                className={`shc-state-path ${selectedState === 'Kerala' ? 'selected' : ''}`}
              >
                <title>Kerala</title>
              </path>

              {/* North East */}
              <path 
                d="M500 210 L590 190 L610 250 L530 290 L490 250 Z" 
                fill="#81C784" 
                stroke="#ffffff" 
                strokeWidth="2"
                className="shc-state-path"
              >
                <title>North-Eastern States</title>
              </path>
            </g>

            {/* Labels overlay */}
            <text x="210" y="160" fontSize="11" fontWeight="bold" fill="#ffffff" pointerEvents="none">PB</text>
            <text x="170" y="230" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">RJ</text>
            <text x="320" y="235" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">UP</text>
            <text x="130" y="325" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">GJ</text>
            <text x="260" y="315" fontSize="13" fontWeight="bold" fill="#ffffff" pointerEvents="none">MP</text>
            <text x="230" y="415" fontSize="13" fontWeight="bold" fill="#ffffff" pointerEvents="none">MH</text>
            <text x="420" y="260" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">BR</text>
            <text x="230" y="520" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">KA</text>
            <text x="300" y="480" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">AP</text>
            <text x="250" y="615" fontSize="12" fontWeight="bold" fill="#ffffff" pointerEvents="none">TN</text>
          </svg>

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
              <span className="shc-state-badge">Click state to inspect</span>
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

            <div className="shc-state-quick-select">
              <label>Select State directly:</label>
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="shc-select"
              >
                {Object.keys(STATE_NUTRIENT_DATA).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
