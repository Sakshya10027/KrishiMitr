export class NutrientMapsService {
  private STATE_NUTRIENT_DATA: Record<string, Record<string, string>> = {
    'Andaman and Nicobar Islands': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient' },
    'Andhra Pradesh': { N: 'Low', P: 'High', K: 'High', OC: 'Medium', pH: 'Alkaline', Zn: 'Medium', S: 'Sufficient' },
    'Arunachal Pradesh': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' },
    'Assam': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' },
    'Bihar': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient' },
    'Chandigarh': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient' },
    'Chhattisgarh': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Low', S: 'Deficient' },
    'Dadra and Nagar Haveli and Daman and Diu': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient' },
    'Delhi': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient' },
    'Goa': { N: 'Medium', P: 'Low', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient' },
    'Gujarat': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Medium', S: 'Deficient' },
    'Haryana': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient' },
    'Himachal Pradesh': { N: 'Medium', P: 'Medium', K: 'High', OC: 'High', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient' },
    'Jammu and Kashmir': { N: 'Medium', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient' },
    'Jharkhand': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Low', S: 'Deficient' },
    'Karnataka': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient' },
    'Kerala': { N: 'Medium', P: 'High', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient' },
    'Ladakh': { N: 'Low', P: 'Low', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient' },
    'Lakshadweep': { N: 'Low', P: 'Low', K: 'Low', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient' },
    'Madhya Pradesh': { N: 'Low', P: 'Medium', K: 'High', OC: 'Medium', pH: 'Neutral', Zn: 'Medium', S: 'Deficient' },
    'Maharashtra': { N: 'Low', P: 'High', K: 'High', OC: 'Medium', pH: 'Alkaline', Zn: 'Medium', S: 'Sufficient' },
    'Manipur': { N: 'High', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient' },
    'Meghalaya': { N: 'High', P: 'Low', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' },
    'Mizoram': { N: 'High', P: 'Low', K: 'Low', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' },
    'Nagaland': { N: 'High', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' },
    'Odisha': { N: 'Low', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', S: 'Deficient' },
    'Puducherry': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient' },
    'Punjab': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient' },
    'Rajasthan': { N: 'Low', P: 'Low', K: 'High', OC: 'Low', pH: 'Alkaline', Zn: 'Low', S: 'Deficient' },
    'Sikkim': { N: 'High', P: 'Low', K: 'Medium', OC: 'High', pH: 'Acidic', Zn: 'High', S: 'Sufficient' },
    'Tamil Nadu': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Low', S: 'Deficient' },
    'Telangana': { N: 'Low', P: 'Medium', K: 'High', OC: 'Low', pH: 'Neutral', Zn: 'Medium', S: 'Deficient' },
    'Tripura': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' },
    'Uttar Pradesh': { N: 'Low', P: 'Medium', K: 'Medium', OC: 'Low', pH: 'Neutral', Zn: 'Medium', S: 'Deficient' },
    'Uttarakhand': { N: 'Medium', P: 'Medium', K: 'High', OC: 'High', pH: 'Neutral', Zn: 'Medium', S: 'Sufficient' },
    'West Bengal': { N: 'Medium', P: 'Low', K: 'Medium', OC: 'Medium', pH: 'Acidic', Zn: 'Medium', S: 'Sufficient' }
  };

  getStateNutrientMap(cycle = 'Cycle-II') {
    return {
      cycle,
      reportingAuthority: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture & Farmers Welfare, GoI',
      citation: 'Cycle-II (2017 to 2019) National Soil Nutrient Survey',
      states: Object.entries(this.STATE_NUTRIENT_DATA).map(([state, nutrients]) => ({
        state,
        ...nutrients
      }))
    };
  }

  getNutrientParameters() {
    return [
      { id: 'N', name: 'Available Nitrogen (N)', unit: 'kg/ha', low: '< 280', medium: '280 - 560', high: '> 560' },
      { id: 'P', name: 'Available Phosphorus (P)', unit: 'kg/ha', low: '< 10', medium: '10 - 25', high: '> 25' },
      { id: 'K', name: 'Available Potassium (K)', unit: 'kg/ha', low: '< 108', medium: '108 - 280', high: '> 280' },
      { id: 'OC', name: 'Organic Carbon (OC)', unit: '%', low: '< 0.50', medium: '0.50 - 0.75', high: '> 0.75' },
      { id: 'pH', name: 'Soil pH Reaction', unit: 'pH scale', acidic: '< 6.5', neutral: '6.5 - 7.5', alkaline: '> 7.5' },
      { id: 'Zn', name: 'Available Zinc (Zn)', unit: 'ppm', deficient: '< 0.60', sufficient: '>= 0.60' },
      { id: 'S', name: 'Available Sulphur (S)', unit: 'ppm', deficient: '< 10.0', sufficient: '>= 10.0' }
    ];
  }
}
