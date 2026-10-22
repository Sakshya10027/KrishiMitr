import React from 'react';
import { Printer, Download, ArrowLeft, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import emblemImg from '../../assets/logos/emblem-india.svg';
import shcLogo from '../../assets/logos/shc-logo.svg';
import { PARAMETER_STANDARDS } from '../../services/soilHealthService';

export default function SoilHealthCardView({ cardData, onBack }) {
  if (!cardData) return null;

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (rating) => {
    const r = (rating || '').toLowerCase();
    if (r.includes('low') || r.includes('acidic')) {
      return <span className="shc-status-badge low"><AlertTriangle size={12} /> {rating}</span>;
    }
    if (r.includes('medium') || r.includes('slight')) {
      return <span className="shc-status-badge medium"><AlertCircle size={12} /> {rating}</span>;
    }
    return <span className="shc-status-badge high"><CheckCircle2 size={12} /> {rating}</span>;
  };

  return (
    <div className="shc-view-wrapper">
      {/* Top Action Bar */}
      <div className="shc-view-actions no-print">
        <button type="button" className="shc-btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Search Another Card</span>
        </button>
        <div className="shc-view-actions-right">
          <button type="button" className="shc-btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Soil Health Card</span>
          </button>
          <button type="button" className="shc-btn-secondary" onClick={handlePrint}>
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Official Soil Health Card Document */}
      <div className="shc-document-card" id="soilHealthCardPrint">
        {/* Document Header */}
        <div className="shc-doc-header">
          <div className="shc-doc-emblem">
            <img src={emblemImg} alt="Emblem of India" />
            <div className="shc-doc-emblem-text">
              <h4>Government of India</h4>
              <p>Ministry of Agriculture & Farmers Welfare</p>
              <p>Department of Agriculture & Farmers Welfare</p>
            </div>
          </div>

          <div className="shc-doc-center-title">
            <h2>सॉयल हेल्थ कार्ड</h2>
            <h1>SOIL HEALTH CARD</h1>
            <p className="shc-doc-slogan">"स्वस्थ धरा, खेत हरा" — Healthy Earth, Greener Farm</p>
          </div>

          <div className="shc-doc-logo">
            <img src={shcLogo} alt="Soil Health Card" />
          </div>
        </div>

        {/* Card Metadata Strip */}
        <div className="shc-doc-meta-strip">
          <div><strong>Card No:</strong> {cardData.shcNumber}</div>
          <div><strong>Cycle:</strong> Cycle II (2024-2027)</div>
          <div><strong>Validity:</strong> 3 Years (Valid till Feb 2029)</div>
        </div>

        {/* Section 1: Farmer & Land Particulars */}
        <div className="shc-doc-section">
          <h3 className="shc-doc-section-title">1. Farmer &amp; Farm Holding Details</h3>
          <div className="shc-doc-details-grid">
            <div><span className="label">Farmer's Name:</span> <strong>{cardData.farmerName}</strong></div>
            <div><span className="label">Father/Husband:</span> <span>{cardData.fatherName}</span></div>
            <div><span className="label">Mobile Number:</span> <span>+91 {cardData.mobileNumber}</span></div>
            <div><span className="label">Aadhaar (Masked):</span> <span>{cardData.aadhaarMasked}</span></div>
            <div><span className="label">Village / Gram:</span> <span>{cardData.village}</span></div>
            <div><span className="label">Sub-District / Taluka:</span> <span>{cardData.subDistrict}</span></div>
            <div><span className="label">District:</span> <span>{cardData.district}</span></div>
            <div><span className="label">State:</span> <span>{cardData.state}</span></div>
            <div><span className="label">Khata / Holding No:</span> <span>{cardData.khataNo}</span></div>
            <div><span className="label">Survey / Khasra No:</span> <span>{cardData.surveyKhasraNo}</span></div>
            <div><span className="label">Farm Area (Ha):</span> <span>{cardData.farmSizeHa} ha</span></div>
            <div><span className="label">Irrigation Source:</span> <span>{cardData.irrigationSource}</span></div>
            <div><span className="label">Soil Texture / Type:</span> <span>{cardData.soilType}</span></div>
          </div>
        </div>

        {/* Section 2: Soil Sample & Testing Laboratory */}
        <div className="shc-doc-section">
          <h3 className="shc-doc-section-title">2. Soil Sample &amp; Laboratory Information</h3>
          <div className="shc-doc-details-grid">
            <div><span className="label">Sample ID:</span> <span>{cardData.sampleDetails.sampleNo}</span></div>
            <div><span className="label">Collection Date:</span> <span>{cardData.sampleDetails.sampleCollectedDate}</span></div>
            <div><span className="label">Testing Date:</span> <span>{cardData.sampleDetails.sampleTestedDate}</span></div>
            <div><span className="label">GPS Geo-Tag:</span> <span>{cardData.sampleDetails.sampleGps}</span></div>
            <div className="full-col"><span className="label">Testing Laboratory:</span> <span>{cardData.sampleDetails.labName}</span></div>
            <div><span className="label">Analyst In-Charge:</span> <span>{cardData.sampleDetails.analystName}</span></div>
          </div>
        </div>

        {/* Section 3: Soil Nutrient Status (12 Parameters) */}
        <div className="shc-doc-section">
          <h3 className="shc-doc-section-title">3. Soil Test Results &amp; Fertility Status (12 Parameters)</h3>
          <div className="shc-table-responsive">
            <table className="shc-parameters-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Nutrient / Parameter</th>
                  <th>Symbol</th>
                  <th>Test Value</th>
                  <th>Unit</th>
                  <th>Fertility Rating</th>
                  <th>Optimum Range / Criteria</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cardData.testResults).map((key, idx) => {
                  const paramInfo = PARAMETER_STANDARDS[key] || {};
                  const result = cardData.testResults[key];
                  return (
                    <tr key={key}>
                      <td className="text-center">{idx + 1}</td>
                      <td><strong>{paramInfo.name || key}</strong></td>
                      <td className="text-center"><code>{key}</code></td>
                      <td className="text-center bold">{result.value}</td>
                      <td className="text-center">{paramInfo.unit || '-'}</td>
                      <td>{getStatusBadge(result.rating)}</td>
                      <td>
                        {key === 'pH' && '6.5 - 7.5 (Neutral)'}
                        {key === 'EC' && '< 1.0 dS/m (Normal)'}
                        {key === 'OC' && '0.50 - 0.75 % (Medium)'}
                        {key === 'N' && '280 - 560 kg/ha'}
                        {key === 'P' && '10.0 - 25.0 kg/ha'}
                        {key === 'K' && '108 - 280 kg/ha'}
                        {key === 'S' && '10.0 - 20.0 ppm'}
                        {key === 'Zn' && '0.60 - 1.20 ppm'}
                        {key === 'Fe' && '4.50 - 9.00 ppm'}
                        {key === 'Cu' && '0.20 - 0.40 ppm'}
                        {key === 'Mn' && '2.00 - 4.00 ppm'}
                        {key === 'B' && '0.50 - 1.00 ppm'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: STCR Fertilizer Recommendations */}
        <div className="shc-doc-section">
          <h3 className="shc-doc-section-title">4. ICAR - STCR Fertilizer Dosage Recommendations</h3>
          {cardData.recommendedCrops.map((crop, cIdx) => (
            <div key={cIdx} className="shc-crop-recommendation-box">
              <div className="shc-crop-rec-header">
                <h4>Crop: {crop.cropName}</h4>
                <span>Target Yield: <strong>{crop.yieldTarget}</strong></span>
              </div>
              <div className="shc-table-responsive">
                <table className="shc-fertilizer-table">
                  <thead>
                    <tr>
                      <th>Fertilizer Name</th>
                      <th>Basal Application (At Sowing)</th>
                      <th>First Top Dressing</th>
                      <th>Second Top Dressing</th>
                      <th>Total Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crop.fertilizers.map((fert, fIdx) => (
                      <tr key={fIdx}>
                        <td><strong>{fert.name}</strong></td>
                        <td>{fert.basal}</td>
                        <td>{fert.topDressing1}</td>
                        <td>{fert.topDressing2}</td>
                        <td><strong>{fert.total}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="shc-organic-advisory">
                <strong>Organic &amp; Bio-fertilizer Advisory:</strong>
                <p>{crop.organicInputs}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 5: Official Verification Signatures */}
        <div className="shc-doc-signatures">
          <div className="shc-sig-block">
            <div className="shc-sig-line">Dr. R. K. Sharma</div>
            <p>Soil Analyst / Chemist</p>
            <small>Soil Testing Laboratory</small>
          </div>
          <div className="shc-seal-block">
            <div className="shc-seal-circle">
              <span>OFFICIAL SEAL</span>
              <span>DEPT OF AGRI</span>
            </div>
          </div>
          <div className="shc-sig-block">
            <div className="shc-sig-line">Dr. P. S. Brar</div>
            <p>Chief Agricultural Officer (CAO)</p>
            <small>Department of Agriculture &amp; Farmers Welfare</small>
          </div>
        </div>

        {/* Document Footer */}
        <div className="shc-doc-footer-legal">
          <small>
            Note: Recommendations are calculated using Soil Test Crop Response (STCR) equations validated by ICAR. For additional guidance, visit the nearest Krishi Vigyan Kendra (KVK) or contact Kisan Call Centre (Toll Free 1800-180-1551).
          </small>
        </div>
      </div>
    </div>
  );
}
