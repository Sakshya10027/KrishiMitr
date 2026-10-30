import PDFDocument from 'pdfkit';
import { Response } from 'express';

export interface SoilHealthCardPDFData {
  cardNumber: string;
  sampleNumber: string;
  farmerName: string;
  farmerPhone?: string | null;
  state: string;
  district: string;
  subDistrict?: string | null;
  village?: string | null;
  khataNo?: string | null;
  khasraNo?: string | null;
  farmSizeHa?: number | null;
  irrigationSource?: string | null;
  soilType?: string | null;
  labName?: string | null;
  analystName?: string | null;
  sampleCollectedDate?: string | null;
  sampleTestedDate?: string | null;
  issueDate?: string | null;
  cropSeason?: string | null;
  testResults: {
    pH: { value: number; rating: string };
    EC: { value: number; rating: string };
    OC: { value: number; rating: string };
    N: { value: number; rating: string };
    P: { value: number; rating: string };
    K: { value: number; rating: string };
    S: { value: number; rating: string };
    Zn: { value: number; rating: string };
    Fe: { value: number; rating: string };
    Cu: { value: number; rating: string };
    Mn: { value: number; rating: string };
    B: { value: number; rating: string };
  };
  recommendations: Array<{
    cropName: string;
    yieldTarget: string;
    fertilizers: Array<{ name: string; basal: string; topDressing1?: string; topDressing2?: string; total: string }>;
    organicInputs?: string | null;
  }>;
}

export function generateSoilHealthCardPDF(card: SoilHealthCardPDFData, res: Response) {
  const doc = new PDFDocument({ margin: 36, size: 'A4' });

  // Stream directly to HTTP response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="SoilHealthCard_${card.cardNumber.replace(/[^a-zA-Z0-9]/g, '_')}.pdf"`);
  doc.pipe(res);

  // Top National Header Banner
  doc.rect(36, 36, 523, 56).fill('#018840');
  doc.fillColor('#ffffff')
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('GOVERNMENT OF INDIA', 36, 44, { align: 'center', width: 523 });
  doc.fontSize(11)
     .text('MINISTRY OF AGRICULTURE & FARMERS WELFARE', { align: 'center', width: 523 });
  doc.fontSize(9.5)
     .font('Helvetica')
     .text('DEPARTMENT OF AGRICULTURE & FARMERS WELFARE — SOIL HEALTH CARD', { align: 'center', width: 523 });

  // Subheader Bar
  doc.rect(36, 96, 523, 22).fill('#f1f5f9');
  doc.fillColor('#0f172a')
     .font('Helvetica-Bold')
     .fontSize(9.5)
     .text(`Card No: ${card.cardNumber}`, 46, 102);
  doc.text(`Sample No: ${card.sampleNumber}`, 320, 102);
  doc.text(`Season: ${card.cropSeason || 'Rabi'}`, 450, 102);

  // Section 1: Farmer & Land Holding Details
  let y = 126;
  doc.rect(36, y, 523, 18).fill('#e2e8f0');
  doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(9).text('1. FARMER & LAND HOLDING PARTICULARS', 42, y + 5);

  y += 24;
  doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
  doc.text(`Farmer Name:`, 42, y); doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.farmerName}`, 120, y);
  doc.font('Helvetica').fillColor('#334155').text(`Mobile:`, 320, y); doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.farmerPhone || 'N/A'}`, 390, y);

  y += 14;
  doc.font('Helvetica').fillColor('#334155').text(`State / District:`, 42, y); 
  doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.state} / ${card.district}`, 120, y);
  doc.font('Helvetica').fillColor('#334155').text(`Block / Village:`, 320, y); 
  doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.subDistrict || '-'} / ${card.village || '-'}`, 390, y);

  y += 14;
  doc.font('Helvetica').fillColor('#334155').text(`Khata / Khasra:`, 42, y); 
  doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.khataNo || '-'} / ${card.khasraNo || '-'}`, 120, y);
  doc.font('Helvetica').fillColor('#334155').text(`Farm Size / Soil:`, 320, y); 
  doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.farmSizeHa || 1} Ha / ${card.soilType || 'Alluvial'}`, 390, y);

  // Section 2: Laboratory & Testing Protocol
  y += 20;
  doc.rect(36, y, 523, 18).fill('#e2e8f0');
  doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(9).text('2. LABORATORY TESTING PARTICULARS', 42, y + 5);

  y += 24;
  doc.font('Helvetica').fontSize(8.5).fillColor('#334155');
  doc.text(`Testing Lab:`, 42, y); 
  doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.labName || 'District Soil Testing Laboratory'}`, 120, y);
  doc.font('Helvetica').fillColor('#334155').text(`Testing Date:`, 320, y); 
  doc.font('Helvetica-Bold').fillColor('#0f172a').text(`${card.sampleTestedDate || 'Official Tested'}`, 390, y);

  // Section 3: 12 Soil Chemical & Physical Parameters Table
  y += 20;
  doc.rect(36, y, 523, 18).fill('#018840');
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9).text('3. LABORATORY SOIL TEST RESULTS (12 PARAMETERS)', 42, y + 5);

  y += 20;
  // Table Header
  doc.rect(36, y, 523, 18).fill('#f8fafc');
  doc.fillColor('#1e293b').font('Helvetica-Bold').fontSize(8);
  doc.text('S.No.', 42, y + 5);
  doc.text('Nutrient / Parameter', 75, y + 5);
  doc.text('Test Value', 240, y + 5);
  doc.text('Standard Unit', 330, y + 5);
  doc.text('Fertility Rating', 430, y + 5);

  const params = [
    { num: '1', name: 'Soil Reaction (pH)', val: card.testResults.pH.value, unit: 'pH scale', rating: card.testResults.pH.rating },
    { num: '2', name: 'Electrical Conductivity (EC)', val: card.testResults.EC.value, unit: 'dS/m', rating: card.testResults.EC.rating },
    { num: '3', name: 'Organic Carbon (OC)', val: card.testResults.OC.value, unit: '%', rating: card.testResults.OC.rating },
    { num: '4', name: 'Available Nitrogen (N)', val: card.testResults.N.value, unit: 'kg/ha', rating: card.testResults.N.rating },
    { num: '5', name: 'Available Phosphorus (P2O5)', val: card.testResults.P.value, unit: 'kg/ha', rating: card.testResults.P.rating },
    { num: '6', name: 'Available Potassium (K2O)', val: card.testResults.K.value, unit: 'kg/ha', rating: card.testResults.K.rating },
    { num: '7', name: 'Available Sulphur (S)', val: card.testResults.S.value, unit: 'ppm', rating: card.testResults.S.rating },
    { num: '8', name: 'Available Zinc (Zn)', val: card.testResults.Zn.value, unit: 'ppm', rating: card.testResults.Zn.rating },
    { num: '9', name: 'Available Iron (Fe)', val: card.testResults.Fe.value, unit: 'ppm', rating: card.testResults.Fe.rating },
    { num: '10', name: 'Available Copper (Cu)', val: card.testResults.Cu.value, unit: 'ppm', rating: card.testResults.Cu.rating },
    { num: '11', name: 'Available Manganese (Mn)', val: card.testResults.Mn.value, unit: 'ppm', rating: card.testResults.Mn.rating },
    { num: '12', name: 'Available Boron (B)', val: card.testResults.B.value, unit: 'ppm', rating: card.testResults.B.rating }
  ];

  y += 18;
  doc.font('Helvetica').fontSize(8);
  params.forEach((p, idx) => {
    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    doc.rect(36, y, 523, 14).fill(rowBg);
    doc.fillColor('#334155');
    doc.text(p.num, 42, y + 3);
    doc.text(p.name, 75, y + 3);
    doc.font('Helvetica-Bold').fillColor('#0f172a').text(String(p.val), 240, y + 3);
    doc.font('Helvetica').fillColor('#64748b').text(p.unit, 330, y + 3);
    
    // Status color
    const isDeficient = ['Low', 'Acidic', 'Deficient'].includes(p.rating);
    doc.font('Helvetica-Bold')
       .fillColor(isDeficient ? '#d32f2f' : '#2e7d32')
       .text(p.rating, 430, y + 3);

    y += 14;
  });

  // Section 4: Crop-wise STCR Fertilizer Guidance
  y += 12;
  doc.rect(36, y, 523, 18).fill('#018840');
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9).text('4. ICAR-STCR FERTILIZER DOSAGE ADVISORY', 42, y + 5);

  y += 22;
  if (card.recommendations && card.recommendations.length > 0) {
    card.recommendations.forEach(rec => {
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor('#0f172a').text(`Crop: ${rec.cropName} (Target Yield: ${rec.yieldTarget})`, 42, y);
      y += 12;
      rec.fertilizers.forEach(f => {
        doc.font('Helvetica').fontSize(8).fillColor('#334155')
           .text(`• ${f.name}: Basal: ${f.basal} | Total: ${f.total}`, 50, y);
        y += 11;
      });
      if (rec.organicInputs) {
        doc.font('Helvetica-Oblique').fontSize(7.5).fillColor('#166534')
           .text(`Organic Advisory: ${rec.organicInputs}`, 50, y);
        y += 12;
      }
      y += 4;
    });
  } else {
    doc.font('Helvetica').fontSize(8).fillColor('#64748b').text('Apply balanced NPK as per local agriculture university package of practices.', 42, y);
    y += 14;
  }

  // Footer Disclaimer
  doc.rect(36, 750, 523, 40).fill('#f1f5f9');
  doc.font('Helvetica').fontSize(7).fillColor('#64748b')
     .text('Disclaimer: This is an educational and technical electronic Soil Health Card generated by KrishiMitr Portal.', 42, 756, { align: 'center', width: 511 })
     .text('Official Soil Health Cards are distributed under the authority of DA&FW, Ministry of Agriculture & Farmers Welfare, GoI.', { align: 'center', width: 511 });

  doc.end();
}
