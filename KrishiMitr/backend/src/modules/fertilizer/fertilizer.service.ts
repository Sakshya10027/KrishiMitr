import { ValidationError } from '../../utils/errors.js';

export interface SoilTestInput {
  ph: number;
  organicCarbon: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  sulphur?: number;
  zinc?: number;
}

export interface AreaInput {
  value: number;
  unit: 'hectare' | 'acre' | 'bigha';
}

export interface FertilizerRecommendationResult {
  crop: string;
  targetYield: string;
  areaRequested: { value: number; unit: string; areaInHectares: number };
  nutrientRequirementsKgPerHa: { N: number; P2O5: number; K2O: number };
  fertilizerProducts: Array<{
    fertilizerName: string;
    totalQuantityKg: number;
    basalDoseKg: number;
    topDressing1Kg: number;
    topDressing2Kg: number;
    applicationStages: string;
  }>;
  organicAdvisory: string;
  soilStatusSummary: {
    nitrogenStatus: string;
    phosphorusStatus: string;
    potassiumStatus: string;
    organicCarbonStatus: string;
    reactionStatus: string;
  };
  calculationAssumptions: string[];
  formulaVersion: string;
}

export class FertilizerService {
  private convertToHectares(value: number, unit: 'hectare' | 'acre' | 'bigha'): number {
    if (value <= 0) throw new ValidationError('Area must be strictly greater than 0');
    switch (unit) {
      case 'hectare':
        return value;
      case 'acre':
        return value * 0.404686; // 1 Acre ≈ 0.4047 Ha
      case 'bigha':
        return value * 0.161874; // Standard Pucca Bigha ≈ 0.1619 Ha
      default:
        return value;
    }
  }

  calculateRecommendations(cropName: string, area: AreaInput, soil: SoilTestInput): FertilizerRecommendationResult {
    const ha = this.convertToHectares(area.value, area.unit);
    const normalizedCrop = cropName.trim().toLowerCase();

    // Baseline Recommended Dose of Fertilizers (RDF) in kg/ha
    let baseN = 120;
    let baseP = 60;
    let baseK = 40;
    let targetYield = '55 q/ha';

    if (normalizedCrop.includes('wheat')) {
      baseN = 120; baseP = 60; baseK = 40; targetYield = '55 q/ha';
    } else if (normalizedCrop.includes('paddy') || normalizedCrop.includes('rice')) {
      baseN = 130; baseP = 50; baseK = 50; targetYield = '50 q/ha';
    } else if (normalizedCrop.includes('mustard') || normalizedCrop.includes('oilseed')) {
      baseN = 80; baseP = 40; baseK = 30; targetYield = '22 q/ha';
    } else if (normalizedCrop.includes('sugarcane')) {
      baseN = 250; baseP = 80; baseK = 80; targetYield = '120 t/ha';
    } else if (normalizedCrop.includes('maize')) {
      baseN = 120; baseP = 60; baseK = 50; targetYield = '60 q/ha';
    } else if (normalizedCrop.includes('cotton')) {
      baseN = 120; baseP = 60; baseK = 60; targetYield = '25 q/ha';
    } else {
      // Default general cereal rotation
      baseN = 100; baseP = 50; baseK = 40; targetYield = 'Standard Target';
    }

    // Soil Test-Based Adjustment Factor (STCR Precision Rules)
    // Nitrogen Adjustment
    let adjN = baseN;
    let nStatus = 'Medium';
    if (soil.nitrogen < 280) {
      adjN = Math.round(baseN * 1.25); // +25% for low
      nStatus = 'Low (Deficient)';
    } else if (soil.nitrogen > 560) {
      adjN = Math.round(baseN * 0.75); // -25% for high
      nStatus = 'High (Adequate)';
    }

    // Phosphorus Adjustment
    let adjP = baseP;
    let pStatus = 'Medium';
    if (soil.phosphorus < 10) {
      adjP = Math.round(baseP * 1.25);
      pStatus = 'Low (Deficient)';
    } else if (soil.phosphorus > 25) {
      adjP = Math.round(baseP * 0.75);
      pStatus = 'High (Adequate)';
    }

    // Potassium Adjustment
    let adjK = baseK;
    let kStatus = 'Medium';
    if (soil.potassium < 108) {
      adjK = Math.round(baseK * 1.25);
      kStatus = 'Low (Deficient)';
    } else if (soil.potassium > 280) {
      adjK = 0; // Omit K application in high K soils
      kStatus = 'High (Luxury Supply)';
    }

    // Product calculations for the entire farm area
    // Step 1: Phosphorus supplied as DAP (46% P2O5, 18% N)
    const dapPerHa = adjP > 0 ? (adjP / 0.46) : 0;
    const nFromDapPerHa = dapPerHa * 0.18;

    // Step 2: Remaining Nitrogen supplied as Urea (46% N)
    const remainingNPerHa = Math.max(0, adjN - nFromDapPerHa);
    const ureaPerHa = remainingNPerHa / 0.46;

    // Step 3: Potassium supplied as MOP (60% K2O)
    const mopPerHa = adjK > 0 ? (adjK / 0.60) : 0;

    // Scale to user's area
    const totalDap = Math.round(dapPerHa * ha);
    const totalUrea = Math.round(ureaPerHa * ha);
    const totalMop = Math.round(mopPerHa * ha);

    // Urea splits (typically 50% basal, 25% at tillering/CRI, 25% at heading)
    const basalUrea = Math.round(totalUrea * 0.45);
    const topDress1Urea = Math.round(totalUrea * 0.35);
    const topDress2Urea = totalUrea - basalUrea - topDress1Urea;

    const products = [
      {
        fertilizerName: 'Urea (46% N)',
        totalQuantityKg: totalUrea,
        basalDoseKg: basalUrea,
        topDressing1Kg: topDress1Urea,
        topDressing2Kg: topDress2Urea,
        applicationStages: 'Basal: at sowing | Top Dressing 1: 21-25 DAS (CRI) | Top Dressing 2: 45-50 DAS'
      },
      {
        fertilizerName: 'Di-Ammonium Phosphate (DAP 18:46)',
        totalQuantityKg: totalDap,
        basalDoseKg: totalDap,
        topDressing1Kg: 0,
        topDressing2Kg: 0,
        applicationStages: '100% Basal application placed 4-5 cm below seed depth at sowing'
      }
    ];

    if (totalMop > 0) {
      products.push({
        fertilizerName: 'Muriate of Potash (MOP 60% K2O)',
        totalQuantityKg: totalMop,
        basalDoseKg: totalMop,
        topDressing1Kg: 0,
        topDressing2Kg: 0,
        applicationStages: '100% Basal application at final land preparation'
      });
    }

    // Micronutrient supplements
    if (soil.zinc && soil.zinc < 0.6) {
      const znQty = Math.round(25 * ha);
      products.push({
        fertilizerName: 'Zinc Sulphate (ZnSO4 21%)',
        totalQuantityKg: znQty,
        basalDoseKg: znQty,
        topDressing1Kg: 0,
        topDressing2Kg: 0,
        applicationStages: 'Broadcast during land preparation; do NOT mix directly with DAP'
      });
    }

    if (soil.sulphur && soil.sulphur < 10) {
      const sQty = Math.round(20 * ha);
      products.push({
        fertilizerName: 'Agricultural Gypsum / Elemental Sulphur',
        totalQuantityKg: sQty,
        basalDoseKg: sQty,
        topDressing1Kg: 0,
        topDressing2Kg: 0,
        applicationStages: 'Soil incorporation 15 days before sowing'
      });
    }

    // Organic Carbon recommendation
    let organicAdvisory = 'Soil Organic Carbon is within adequate levels (>0.75%). Apply maintenance compost @ 5 tonnes/ha.';
    if (soil.organicCarbon < 0.5) {
      organicAdvisory = `Soil Organic Carbon is critically Low (${soil.organicCarbon}%). Apply 10 to 12 tonnes/ha well-decomposed Farm Yard Manure (FYM) or 5 tonnes/ha Vermicompost before primary tillage. Practice green manuring with Dhaincha (Sesbania) where irrigation permits.`;
    } else if (soil.organicCarbon <= 0.75) {
      organicAdvisory = `Soil Organic Carbon is Medium (${soil.organicCarbon}%). Apply 6 to 8 tonnes/ha composted organic matter or incorporate crop residues rather than burning.`;
    }

    return {
      crop: cropName,
      targetYield,
      areaRequested: {
        value: area.value,
        unit: area.unit,
        areaInHectares: Math.round(ha * 100) / 100
      },
      nutrientRequirementsKgPerHa: {
        N: adjN,
        P2O5: adjP,
        K2O: adjK
      },
      fertilizerProducts: products,
      organicAdvisory,
      soilStatusSummary: {
        nitrogenStatus: nStatus,
        phosphorusStatus: pStatus,
        potassiumStatus: kStatus,
        organicCarbonStatus: soil.organicCarbon < 0.5 ? 'Low' : soil.organicCarbon <= 0.75 ? 'Medium' : 'High',
        reactionStatus: soil.ph < 6.5 ? 'Acidic' : soil.ph <= 7.5 ? 'Neutral' : 'Alkaline'
      },
      calculationAssumptions: [
        'DAP supplies both P2O5 (46%) and N (18%); Urea provides remaining N requirement.',
        'MOP omitted when soil available K exceeds 280 kg/ha to avoid luxury consumption.',
        'Split nitrogen doses maximize crop uptake efficiency and mitigate leaching losses.',
        'Zinc sulphate must be applied separately from phosphatic fertilizers to prevent zinc phosphate precipitation.'
      ],
      formulaVersion: 'ICAR-STCR-2024-v2.1'
    };
  }
}
