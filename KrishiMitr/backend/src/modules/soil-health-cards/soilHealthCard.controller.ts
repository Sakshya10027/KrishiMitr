import { Request, Response, NextFunction } from 'express';
import { SoilHealthCardService } from './soilHealthCard.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';
import { generateSoilHealthCardPDF, SoilHealthCardPDFData } from '../../services/pdf/pdfGenerator.js';

const shcService = new SoilHealthCardService();

export class SoilHealthCardController {
  async searchCards(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await shcService.searchCards(req.body);
      return sendSuccess(res, cards, `Found ${cards.length} matching Soil Health Card records`);
    } catch (error) {
      next(error);
    }
  }

  async getCardById(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await shcService.getCardById(req.params.id as string);
      return sendSuccess(res, card, 'Soil Health Card retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getCardPDF(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await shcService.getCardById(req.params.id as string);

      const r = card.testResult;
      const pdfData: SoilHealthCardPDFData = {
        cardNumber: card.cardNumber,
        sampleNumber: card.sampleNumber,
        farmerName: card.farmerName,
        farmerPhone: card.farmerPhone,
        state: card.state.name,
        district: card.district.name,
        subDistrict: card.subDistrict?.name,
        village: card.village?.name,
        khataNo: card.khataNo,
        khasraNo: card.khasraNo,
        farmSizeHa: card.farmSizeHa,
        irrigationSource: card.irrigationSource,
        soilType: card.soilType,
        labName: card.laboratory?.name,
        sampleCollectedDate: card.collectionDate ? card.collectionDate.toLocaleDateString('en-IN') : undefined,
        sampleTestedDate: card.testingDate ? card.testingDate.toLocaleDateString('en-IN') : undefined,
        issueDate: card.issueDate ? card.issueDate.toLocaleDateString('en-IN') : undefined,
        cropSeason: card.cropSeason,
        testResults: {
          pH: { value: r?.pH || 7.0, rating: r?.pH_rating || 'Neutral' },
          EC: { value: r?.EC || 0.3, rating: r?.EC_rating || 'Normal' },
          OC: { value: r?.OC || 0.5, rating: r?.OC_rating || 'Medium' },
          N: { value: r?.N || 220, rating: r?.N_rating || 'Low' },
          P: { value: r?.P || 18, rating: r?.P_rating || 'Medium' },
          K: { value: r?.K || 240, rating: r?.K_rating || 'Medium' },
          S: { value: r?.S || 10, rating: r?.S_rating || 'Medium' },
          Zn: { value: r?.Zn || 0.6, rating: r?.Zn_rating || 'Medium' },
          Fe: { value: r?.Fe || 5.0, rating: r?.Fe_rating || 'Medium' },
          Cu: { value: r?.Cu || 0.4, rating: r?.Cu_rating || 'Medium' },
          Mn: { value: r?.Mn || 3.0, rating: r?.Mn_rating || 'Medium' },
          B: { value: r?.B || 0.5, rating: r?.B_rating || 'Medium' }
        },
        recommendations: ((card.recommendations as any[]) || []).map((rec: any) => ({
          cropName: rec.cropName,
          yieldTarget: rec.yieldTarget || `${rec.targetYield || 50} q/ha`,
          fertilizers: (rec.fertilizers as any) || [],
          organicInputs: rec.organicInputs || rec.organicManure
        }))
      };

      generateSoilHealthCardPDF(pdfData, res);
    } catch (error) {
      next(error);
    }
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await shcService.createCard(req.body);
      return sendSuccess(res, card, 'Soil Health Card created successfully', 201);
    } catch (error) {
      next(error);
    }
  }
}
