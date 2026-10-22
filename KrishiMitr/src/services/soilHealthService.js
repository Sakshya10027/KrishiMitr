// Soil Health Service
// Simulates Soil Health Card generation, 12 parameter calculations, and ICAR-STCR fertilizer recommendations

export const PARAMETER_STANDARDS = {
  pH: { name: 'Soil Reaction (pH)', unit: '', minNormal: 6.5, maxNormal: 7.5, type: 'chemical' },
  EC: { name: 'Electrical Conductivity (EC)', unit: 'dS/m', minNormal: 0, maxNormal: 1.0, type: 'chemical' },
  OC: { name: 'Organic Carbon (OC)', unit: '%', low: 0.5, medium: 0.75, high: 0.75, type: 'macro' },
  N: { name: 'Available Nitrogen (N)', unit: 'kg/ha', low: 280, medium: 560, high: 560, type: 'macro' },
  P: { name: 'Available Phosphorus (P2O5)', unit: 'kg/ha', low: 10, medium: 25, high: 25, type: 'macro' },
  K: { name: 'Available Potassium (K2O)', unit: 'kg/ha', low: 108, medium: 280, high: 280, type: 'macro' },
  S: { name: 'Available Sulphur (S)', unit: 'ppm', low: 10, medium: 20, high: 20, type: 'secondary' },
  Zn: { name: 'Available Zinc (Zn)', unit: 'ppm', low: 0.6, medium: 1.2, high: 1.2, type: 'micro' },
  Fe: { name: 'Available Iron (Fe)', unit: 'ppm', low: 4.5, medium: 9.0, high: 9.0, type: 'micro' },
  Cu: { name: 'Available Copper (Cu)', unit: 'ppm', low: 0.2, medium: 0.4, high: 0.4, type: 'micro' },
  Mn: { name: 'Available Manganese (Mn)', unit: 'ppm', low: 2.0, medium: 4.0, high: 4.0, type: 'micro' },
  B: { name: 'Available Boron (B)', unit: 'ppm', low: 0.5, medium: 1.0, high: 1.0, type: 'micro' }
};

export const MOCK_FARMERS = [
  {
    shcNumber: 'SHC/2026/PB/LDH/049182',
    farmerName: 'Gurpreet Singh',
    fatherName: 'Harbhajan Singh',
    gender: 'Male',
    aadhaarMasked: 'XXXX-XXXX-4912',
    mobileNumber: '9876543210',
    state: 'Punjab',
    district: 'Ludhiana',
    subDistrict: 'Jagraon',
    village: 'Sidhwan Bet',
    khataNo: '142/3',
    surveyKhasraNo: '88/14-15',
    farmSizeHa: '2.40',
    irrigationSource: 'Tubewell',
    soilType: 'Alluvial Loam',
    sampleDetails: {
      sampleNo: 'SMP/2026/0892',
      sampleCollectedDate: '12-Jan-2026',
      sampleTestedDate: '24-Jan-2026',
      labName: 'District Soil Testing Laboratory, Ludhiana',
      analystName: 'Dr. R. K. Sharma',
      sampleGps: '30.9010° N, 75.8573° E'
    },
    testResults: {
      pH: { value: 7.4, rating: 'Neutral' },
      EC: { value: 0.32, rating: 'Normal' },
      OC: { value: 0.42, rating: 'Low' },
      N: { value: 210, rating: 'Low' },
      P: { value: 16.5, rating: 'Medium' },
      K: { value: 295, rating: 'High' },
      S: { value: 8.5, rating: 'Low' },
      Zn: { value: 0.52, rating: 'Low' },
      Fe: { value: 5.8, rating: 'Medium' },
      Cu: { value: 0.65, rating: 'High' },
      Mn: { value: 3.4, rating: 'Medium' },
      B: { value: 0.42, rating: 'Low' }
    },
    recommendedCrops: [
      {
        cropName: 'Wheat (PBW 824 / HD 3086)',
        yieldTarget: '55 q/ha',
        fertilizers: [
          { name: 'Urea', basal: '65 kg/ha', topDressing1: '65 kg/ha (CRI stage)', topDressing2: '30 kg/ha (Heading stage)', total: '160 kg/ha' },
          { name: 'Di-Ammonium Phosphate (DAP)', basal: '55 kg/ha', topDressing1: '-', topDressing2: '-', total: '55 kg/ha' },
          { name: 'Muriate of Potash (MOP)', basal: 'Nil (Potassium High)', topDressing1: '-', topDressing2: '-', total: '0 kg/ha' },
          { name: 'Zinc Sulphate (21%)', basal: '25 kg/ha', topDressing1: '-', topDressing2: '-', total: '25 kg/ha' },
          { name: 'Gypsum / Elemental Sulphur', basal: '20 kg/ha', topDressing1: '-', topDressing2: '-', total: '20 kg/ha' }
        ],
        organicInputs: 'Apply 10 tonnes/ha Farm Yard Manure (FYM) or 5 tonnes/ha Vermicompost before sowing to replenish depleted Organic Carbon.'
      },
      {
        cropName: 'Paddy / Basmati Rice (Pusa 1121)',
        yieldTarget: '48 q/ha',
        fertilizers: [
          { name: 'Urea', basal: '50 kg/ha', topDressing1: '50 kg/ha (Tillering)', topDressing2: '35 kg/ha (Panicle)', total: '135 kg/ha' },
          { name: 'DAP', basal: '60 kg/ha', topDressing1: '-', topDressing2: '-', total: '60 kg/ha' },
          { name: 'Zinc Sulphate (33% Monohydrate)', basal: '15 kg/ha', topDressing1: '-', topDressing2: '-', total: '15 kg/ha' }
        ],
        organicInputs: 'Green manuring with Dhaincha (Sesbania aculeata) at 45 days before puddling.'
      }
    ]
  },
  {
    shcNumber: 'SHC/2026/UP/LKO/183921',
    farmerName: 'Rameshwar Prasad Yadav',
    fatherName: 'Ram Dulare Yadav',
    gender: 'Male',
    aadhaarMasked: 'XXXX-XXXX-8319',
    mobileNumber: '9415012345',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    subDistrict: 'Bakshi Ka Talab',
    village: 'Bhaisamau',
    khataNo: '78/2',
    surveyKhasraNo: '312/1',
    farmSizeHa: '1.80',
    irrigationSource: 'Canal & Tubewell',
    soilType: 'Sandy Loam',
    sampleDetails: {
      sampleNo: 'SMP/2026/1943',
      sampleCollectedDate: '18-Jan-2026',
      sampleTestedDate: '29-Jan-2026',
      labName: 'Central Soil Testing Lab, Alambagh, Lucknow',
      analystName: 'Dr. Sunita Verma',
      sampleGps: '26.8467° N, 80.9462° E'
    },
    testResults: {
      pH: { value: 7.8, rating: 'Slightly Alkaline' },
      EC: { value: 0.45, rating: 'Normal' },
      OC: { value: 0.38, rating: 'Low' },
      N: { value: 185, rating: 'Low' },
      P: { value: 12.0, rating: 'Medium' },
      K: { value: 195, rating: 'Medium' },
      S: { value: 11.2, rating: 'Medium' },
      Zn: { value: 0.48, rating: 'Low' },
      Fe: { value: 6.2, rating: 'Medium' },
      Cu: { value: 0.42, rating: 'Medium' },
      Mn: { value: 2.8, rating: 'Medium' },
      B: { value: 0.35, rating: 'Low' }
    },
    recommendedCrops: [
      {
        cropName: 'Mustard (Pusa Bold)',
        yieldTarget: '22 q/ha',
        fertilizers: [
          { name: 'Urea', basal: '45 kg/ha', topDressing1: '45 kg/ha (Rosette stage)', topDressing2: '-', total: '90 kg/ha' },
          { name: 'Single Super Phosphate (SSP)', basal: '150 kg/ha', topDressing1: '-', topDressing2: '-', total: '150 kg/ha' },
          { name: 'MOP', basal: '30 kg/ha', topDressing1: '-', topDressing2: '-', total: '30 kg/ha' },
          { name: 'Borax', basal: '10 kg/ha', topDressing1: '-', topDressing2: '-', total: '10 kg/ha' }
        ],
        organicInputs: 'Incorporate 8-10 tonnes/ha well-decomposed cow dung manure.'
      }
    ]
  },
  {
    shcNumber: 'SHC/2026/MH/PUN/582910',
    farmerName: 'Sunita Dnyaneshwar Patil',
    fatherName: 'Dnyaneshwar Patil',
    gender: 'Female',
    aadhaarMasked: 'XXXX-XXXX-9921',
    mobileNumber: '9822019921',
    state: 'Maharashtra',
    district: 'Pune',
    subDistrict: 'Baramati',
    village: 'Malegaon',
    khataNo: '204/1',
    surveyKhasraNo: '119/4',
    farmSizeHa: '3.10',
    irrigationSource: 'Drip Irrigation',
    soilType: 'Medium Black Soil (Vertisol)',
    sampleDetails: {
      sampleNo: 'SMP/2026/5129',
      sampleCollectedDate: '05-Feb-2026',
      sampleTestedDate: '15-Feb-2026',
      labName: 'KVK Soil Testing Facility, Baramati',
      analystName: 'Dr. Anand Kulkarni',
      sampleGps: '18.1517° N, 74.5772° E'
    },
    testResults: {
      pH: { value: 8.1, rating: 'Moderately Alkaline' },
      EC: { value: 0.58, rating: 'Normal' },
      OC: { value: 0.62, rating: 'Medium' },
      N: { value: 240, rating: 'Low' },
      P: { value: 28.5, rating: 'High' },
      K: { value: 340, rating: 'High' },
      S: { value: 14.0, rating: 'Medium' },
      Zn: { value: 0.85, rating: 'Medium' },
      Fe: { value: 3.8, rating: 'Low' },
      Cu: { value: 0.55, rating: 'High' },
      Mn: { value: 4.2, rating: 'High' },
      B: { value: 0.65, rating: 'Medium' }
    },
    recommendedCrops: [
      {
        cropName: 'Sugarcane (Co 86032)',
        yieldTarget: '120 t/ha',
        fertilizers: [
          { name: 'Urea', basal: '60 kg/ha', topDressing1: '90 kg/ha (at 45 days)', topDressing2: '100 kg/ha (Earthing up)', total: '250 kg/ha' },
          { name: 'DAP / SSP', basal: '100 kg/ha', topDressing1: '-', topDressing2: '-', total: '100 kg/ha' },
          { name: 'Ferrous Sulphate (FeSO4)', basal: '25 kg/ha', topDressing1: 'Foliar spray 0.5% FeSO4', topDressing2: '-', total: '25 kg/ha' }
        ],
        organicInputs: 'Apply Press mud cake @ 10 t/ha or Vermicompost @ 5 t/ha.'
      }
    ]
  }
];

export function searchSoilHealthCard({ queryType, phoneNumber, farmerName, state, district, village }) {
  if (queryType === 'phone') {
    const cleanPhone = (phoneNumber || '').replace(/\D/g, '');
    const found = MOCK_FARMERS.find(f => f.mobileNumber.endsWith(cleanPhone) || cleanPhone.endsWith(f.mobileNumber));
    if (found) return [found];
    // If not found in primary list, generate realistic dynamic record matching this phone
    if (cleanPhone.length >= 10) {
      return [generateDynamicRecord({ mobileNumber: cleanPhone, farmerName: 'Registered Kisan' })];
    }
    return [];
  } else {
    // Name / State / District / Village search
    const results = MOCK_FARMERS.filter(f => {
      let matches = true;
      if (farmerName && !f.farmerName.toLowerCase().includes(farmerName.toLowerCase())) matches = false;
      if (state && f.state.toLowerCase() !== state.toLowerCase()) matches = false;
      if (district && f.district.toLowerCase() !== district.toLowerCase()) matches = false;
      return matches;
    });

    if (results.length > 0) return results;

    // If search specified a state and name, provide dynamic simulated result
    if (farmerName && farmerName.trim().length > 2) {
      return [generateDynamicRecord({ farmerName, state: state || 'Punjab', district: district || 'Ludhiana', village: village || 'Gram' })];
    }
    return [];
  }
}

function generateDynamicRecord({ mobileNumber = '9876543210', farmerName = 'Kisan', state = 'Uttar Pradesh', district = 'Varanasi', village = 'Shivpur' }) {
  return {
    shcNumber: `SHC/2026/${state.slice(0, 2).toUpperCase()}/${district.slice(0, 3).toUpperCase()}/${Math.floor(100000 + Math.random() * 900000)}`,
    farmerName,
    fatherName: 'Late Shri Nath',
    gender: 'Male',
    aadhaarMasked: 'XXXX-XXXX-5521',
    mobileNumber,
    state,
    district,
    subDistrict: 'Sadar',
    village,
    khataNo: '54/1',
    surveyKhasraNo: '182/2',
    farmSizeHa: '1.50',
    irrigationSource: 'Canal',
    soilType: 'Loam',
    sampleDetails: {
      sampleNo: `SMP/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      sampleCollectedDate: '10-Feb-2026',
      sampleTestedDate: '20-Feb-2026',
      labName: `District Soil Testing Laboratory, ${district}`,
      analystName: 'Authorized Lab Analyst',
      sampleGps: '25.3176° N, 82.9739° E'
    },
    testResults: {
      pH: { value: 7.2, rating: 'Neutral' },
      EC: { value: 0.28, rating: 'Normal' },
      OC: { value: 0.48, rating: 'Low' },
      N: { value: 230, rating: 'Low' },
      P: { value: 18.0, rating: 'Medium' },
      K: { value: 240, rating: 'Medium' },
      S: { value: 9.0, rating: 'Low' },
      Zn: { value: 0.55, rating: 'Low' },
      Fe: { value: 5.2, rating: 'Medium' },
      Cu: { value: 0.45, rating: 'Medium' },
      Mn: { value: 3.1, rating: 'Medium' },
      B: { value: 0.48, rating: 'Low' }
    },
    recommendedCrops: [
      {
        cropName: 'Paddy / Wheat Rotation',
        yieldTarget: '50 q/ha',
        fertilizers: [
          { name: 'Urea', basal: '60 kg/ha', topDressing1: '60 kg/ha', topDressing2: '30 kg/ha', total: '150 kg/ha' },
          { name: 'DAP', basal: '65 kg/ha', topDressing1: '-', topDressing2: '-', total: '65 kg/ha' },
          { name: 'MOP', basal: '35 kg/ha', topDressing1: '-', topDressing2: '-', total: '35 kg/ha' },
          { name: 'Zinc Sulphate', basal: '20 kg/ha', topDressing1: '-', topDressing2: '-', total: '20 kg/ha' }
        ],
        organicInputs: 'Apply 10 tonnes/ha FYM or Green manure to increase soil Organic Carbon.'
      }
    ]
  };
}
