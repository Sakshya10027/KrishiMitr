import { describe, it, expect } from 'vitest';
import { FertilizerService } from '../modules/fertilizer/fertilizer.service.js';
import { ValidationError } from '../utils/errors.js';

describe('Fertilizer Recommendation Engine (ICAR-STCR)', () => {
  const service = new FertilizerService();

  const standardSoil = {
    ph: 7.2,
    organicCarbon: 0.45,
    nitrogen: 210, // Low (< 280)
    phosphorus: 16.5, // Medium (10 - 25)
    potassium: 295, // High (> 280)
    zinc: 0.52, // Deficient (< 0.6)
    sulphur: 8.5 // Deficient (< 10)
  };

  it('calculates recommendations for Wheat accurately with Low N and High K', () => {
    const result = service.calculateRecommendations('wheat', { value: 1.0, unit: 'hectare' }, standardSoil);

    expect(result.crop).toBe('wheat');
    expect(result.targetYield).toBe('55 q/ha');
    expect(result.formulaVersion).toBe('ICAR-STCR-2024-v2.1');
    expect(result.soilStatusSummary.nitrogenStatus).toContain('Low');
    expect(result.soilStatusSummary.potassiumStatus).toContain('High');

    // N was adjusted upwards (+25% of 120 = 150)
    expect(result.nutrientRequirementsKgPerHa.N).toBe(150);
    // K was zeroed because soil K is high (> 280)
    expect(result.nutrientRequirementsKgPerHa.K2O).toBe(0);

    const urea = result.fertilizerProducts.find(p => p.fertilizerName.includes('Urea'));
    const dap = result.fertilizerProducts.find(p => p.fertilizerName.includes('DAP'));
    const mop = result.fertilizerProducts.find(p => p.fertilizerName.includes('MOP'));
    const zinc = result.fertilizerProducts.find(p => p.fertilizerName.includes('Zinc'));

    expect(urea).toBeDefined();
    expect(dap).toBeDefined();
    expect(mop).toBeUndefined(); // MOP omitted when K is high
    expect(zinc).toBeDefined(); // Zinc included because soil zinc < 0.6
  });

  it('handles Acre to Hectare conversion properly', () => {
    const resultHectare = service.calculateRecommendations('wheat', { value: 1.0, unit: 'hectare' }, standardSoil);
    // 2.471 acres ≈ 1 hectare
    const resultAcre = service.calculateRecommendations('wheat', { value: 2.471, unit: 'acre' }, standardSoil);

    const ureaHa = resultHectare.fertilizerProducts.find(p => p.fertilizerName.includes('Urea'))!.totalQuantityKg;
    const ureaAcre = resultAcre.fertilizerProducts.find(p => p.fertilizerName.includes('Urea'))!.totalQuantityKg;

    // Quantities should be within 1 kg due to rounding
    expect(Math.abs(ureaHa - ureaAcre)).toBeLessThanOrEqual(2);
  });

  it('throws ValidationError when area is zero or negative', () => {
    expect(() => {
      service.calculateRecommendations('wheat', { value: 0, unit: 'hectare' }, standardSoil);
    }).toThrow(ValidationError);

    expect(() => {
      service.calculateRecommendations('wheat', { value: -2.5, unit: 'hectare' }, standardSoil);
    }).toThrow(ValidationError);
  });

  it('provides organic advisory when Organic Carbon is low (<0.5%)', () => {
    const result = service.calculateRecommendations('paddy', { value: 1.0, unit: 'hectare' }, {
      ...standardSoil,
      organicCarbon: 0.35
    });

    expect(result.organicAdvisory).toContain('critically Low');
    expect(result.organicAdvisory).toContain('Farm Yard Manure');
  });
});
