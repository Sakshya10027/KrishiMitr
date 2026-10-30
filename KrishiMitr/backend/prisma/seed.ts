/// <reference types="node" />
import process from 'node:process';
import { PrismaClient, Role, LaboratoryType, CardStatus, ResourceCategory, TicketStatus, TicketPriority } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const STATES_DATA = [
  { id: 'st-andaman', code: 'AN', name: 'Andaman and Nicobar Islands', type: 'UT' },
  { id: 'st-andhra', code: 'AP', name: 'Andhra Pradesh', type: 'STATE' },
  { id: 'st-arunachal', code: 'AR', name: 'Arunachal Pradesh', type: 'STATE' },
  { id: 'st-assam', code: 'AS', name: 'Assam', type: 'STATE' },
  { id: 'st-bihar', code: 'BR', name: 'Bihar', type: 'STATE' },
  { id: 'st-chandigarh', code: 'CH', name: 'Chandigarh', type: 'UT' },
  { id: 'st-chhattisgarh', code: 'CG', name: 'Chhattisgarh', type: 'STATE' },
  { id: 'st-dnh-dd', code: 'DH', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'UT' },
  { id: 'st-delhi', code: 'DL', name: 'Delhi', type: 'UT' },
  { id: 'st-goa', code: 'GA', name: 'Goa', type: 'STATE' },
  { id: 'st-gujarat', code: 'GJ', name: 'Gujarat', type: 'STATE' },
  { id: 'st-haryana', code: 'HR', name: 'Haryana', type: 'STATE' },
  { id: 'st-himachal', code: 'HP', name: 'Himachal Pradesh', type: 'STATE' },
  { id: 'st-jk', code: 'JK', name: 'Jammu and Kashmir', type: 'UT' },
  { id: 'st-jharkhand', code: 'JH', name: 'Jharkhand', type: 'STATE' },
  { id: 'st-karnataka', code: 'KA', name: 'Karnataka', type: 'STATE' },
  { id: 'st-kerala', code: 'KL', name: 'Kerala', type: 'STATE' },
  { id: 'st-ladakh', code: 'LA', name: 'Ladakh', type: 'UT' },
  { id: 'st-lakshadweep', code: 'LD', name: 'Lakshadweep', type: 'UT' },
  { id: 'st-madhya-pradesh', code: 'MP', name: 'Madhya Pradesh', type: 'STATE' },
  { id: 'st-maharashtra', code: 'MH', name: 'Maharashtra', type: 'STATE' },
  { id: 'st-manipur', code: 'MN', name: 'Manipur', type: 'STATE' },
  { id: 'st-meghalaya', code: 'ML', name: 'Meghalaya', type: 'STATE' },
  { id: 'st-mizoram', code: 'MZ', name: 'Mizoram', type: 'STATE' },
  { id: 'st-nagaland', code: 'NL', name: 'Nagaland', type: 'STATE' },
  { id: 'st-odisha', code: 'OD', name: 'Odisha', type: 'STATE' },
  { id: 'st-puducherry', code: 'PY', name: 'Puducherry', type: 'UT' },
  { id: 'st-punjab', code: 'PB', name: 'Punjab', type: 'STATE' },
  { id: 'st-rajasthan', code: 'RJ', name: 'Rajasthan', type: 'STATE' },
  { id: 'st-sikkim', code: 'SK', name: 'Sikkim', type: 'STATE' },
  { id: 'st-tamil-nadu', code: 'TN', name: 'Tamil Nadu', type: 'STATE' },
  { id: 'st-telangana', code: 'TS', name: 'Telangana', type: 'STATE' },
  { id: 'st-tripura', code: 'TR', name: 'Tripura', type: 'STATE' },
  { id: 'st-uttar-pradesh', code: 'UP', name: 'Uttar Pradesh', type: 'STATE' },
  { id: 'st-uttarakhand', code: 'UK', name: 'Uttarakhand', type: 'STATE' },
  { id: 'st-west-bengal', code: 'WB', name: 'West Bengal', type: 'STATE' }
];

export async function main() {
  console.log('🌱 Starting KrishiMitr Idempotent Database Seed...');

  // 1. Seed 36 States & UTs
  for (const st of STATES_DATA) {
    await prisma.state.upsert({
      where: { code: st.code },
      update: { name: st.name, type: st.type },
      create: st
    });
  }
  console.log('✅ Seeded 36 States and UTs');

  // 2. Seed Key Districts
  const districts = [
    { id: 'dist-pb-ldh', stateId: 'st-punjab', code: 'LDH', name: 'Ludhiana' },
    { id: 'dist-pb-asr', stateId: 'st-punjab', code: 'ASR', name: 'Amritsar' },
    { id: 'dist-up-lko', stateId: 'st-uttar-pradesh', code: 'LKO', name: 'Lucknow' },
    { id: 'dist-up-agr', stateId: 'st-uttar-pradesh', code: 'AGR', name: 'Agra' },
    { id: 'dist-up-vns', stateId: 'st-uttar-pradesh', code: 'VNS', name: 'Varanasi' },
    { id: 'dist-mh-pun', stateId: 'st-maharashtra', code: 'PUN', name: 'Pune' },
    { id: 'dist-mh-nsk', stateId: 'st-maharashtra', code: 'NSK', name: 'Nashik' },
    { id: 'dist-rj-jpr', stateId: 'st-rajasthan', code: 'JPR', name: 'Jaipur' },
    { id: 'dist-ka-blr', stateId: 'st-karnataka', code: 'BLR', name: 'Bengaluru Urban' },
    { id: 'dist-br-pat', stateId: 'st-bihar', code: 'PAT', name: 'Patna' }
  ];

  for (const d of districts) {
    await prisma.district.upsert({
      where: { id: d.id },
      update: { name: d.name, code: d.code, stateId: d.stateId },
      create: d
    });
  }
  console.log('✅ Seeded Key Representative Districts');

  // 3. Seed Blocks / SubDistricts
  const subDistricts = [
    { id: 'sub-jagraon', districtId: 'dist-pb-ldh', name: 'Jagraon' },
    { id: 'sub-ludhiana-1', districtId: 'dist-pb-ldh', name: 'Ludhiana-1' },
    { id: 'sub-bkt', districtId: 'dist-up-lko', name: 'Bakshi Ka Talab' },
    { id: 'sub-bichpuri', districtId: 'dist-up-agr', name: 'Bichpuri' },
    { id: 'sub-baramati', districtId: 'dist-mh-pun', name: 'Baramati' },
    { id: 'sub-haveli', districtId: 'dist-mh-pun', name: 'Haveli' }
  ];

  for (const sd of subDistricts) {
    await prisma.subDistrict.upsert({
      where: { id: sd.id },
      update: { name: sd.name, districtId: sd.districtId },
      create: sd
    });
  }

  // 4. Seed Villages
  const villages = [
    { id: 'vil-sidhwan', subDistrictId: 'sub-jagraon', name: 'Sidhwan Bet', pincode: '142024' },
    { id: 'vil-bhaisamau', subDistrictId: 'sub-bkt', name: 'Bhaisamau', pincode: '226201' },
    { id: 'vil-malegaon', subDistrictId: 'sub-baramati', name: 'Malegaon', pincode: '413115' }
  ];

  for (const v of villages) {
    await prisma.village.upsert({
      where: { id: v.id },
      update: { name: v.name, subDistrictId: v.subDistrictId, pincode: v.pincode },
      create: v
    });
  }

  // 5. Seed Administrative Accounts
  const adminPasswordHash = await bcrypt.hash('KrishiMitr@Admin2026!', 10);
  const operatorPasswordHash = await bcrypt.hash('Punjab@Soil2026', 10);

  await prisma.user.upsert({
    where: { email: 'admin@soilhealth.gov.in' },
    update: { passwordHash: adminPasswordHash, role: Role.ADMIN },
    create: {
      fullName: 'National Portal Nodal Administrator',
      email: 'admin@soilhealth.gov.in',
      phone: '9800000001',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      preferredLanguage: 'en',
      isActive: true
    }
  });

  await prisma.user.upsert({
    where: { email: 'stl.analyst.ldh@punjab.gov.in' },
    update: { passwordHash: operatorPasswordHash, role: Role.LAB_OPERATOR },
    create: {
      fullName: 'Dr. R. K. Sharma (Ludhiana STL)',
      email: 'stl.analyst.ldh@punjab.gov.in',
      phone: '9876543210',
      passwordHash: operatorPasswordHash,
      role: Role.LAB_OPERATOR,
      stateId: 'st-punjab',
      districtId: 'dist-pb-ldh',
      preferredLanguage: 'en',
      isActive: true
    }
  });
  console.log('✅ Seeded Initial Administrators & Lab Operators');

  // 6. Seed Laboratories
  const labs = [
    {
      id: 'lab-ldh-01',
      name: 'District Soil Testing Laboratory, Ludhiana',
      laboratoryType: LaboratoryType.DISTRICT_STATIC,
      stateId: 'st-punjab',
      districtId: 'dist-pb-ldh',
      address: 'Near Old Courts Complex, GT Road, Ludhiana, Punjab - 141001',
      postalCode: '141001',
      latitude: 30.9010,
      longitude: 75.8573,
      phone: '0161-2401960',
      email: 'stl.ludhiana@punjab.gov.in',
      accreditationStatus: 'NABL Accredited & State Referral Lab',
      supportedParameters: '12 Parameters (NPK, OC, pH, EC, S, Zn, Fe, Cu, Mn, B)',
      sampleCapacity: 15000,
      isActive: true
    },
    {
      id: 'lab-lko-01',
      name: 'Central Soil Testing Laboratory, Alambagh, Lucknow',
      laboratoryType: LaboratoryType.DISTRICT_STATIC,
      stateId: 'st-uttar-pradesh',
      districtId: 'dist-up-lko',
      address: 'Department of Agriculture Campus, Alambagh, Lucknow, Uttar Pradesh - 226005',
      postalCode: '226005',
      latitude: 26.8467,
      longitude: 80.9462,
      phone: '0522-2451290',
      email: 'cstl.lucknow@up.gov.in',
      accreditationStatus: 'State Certified Soil Testing Facility',
      supportedParameters: '12 Parameters + Heavy Metals',
      sampleCapacity: 20000,
      isActive: true
    },
    {
      id: 'lab-pun-01',
      name: 'KVK Soil Testing Facility, Baramati',
      laboratoryType: LaboratoryType.ICAR_KVK,
      stateId: 'st-maharashtra',
      districtId: 'dist-mh-pun',
      address: 'Krishi Vigyan Kendra Campus, Malegaon Khurd, Baramati, Pune, Maharashtra - 413115',
      postalCode: '413115',
      latitude: 18.1517,
      longitude: 74.5772,
      phone: '02112-255207',
      email: 'kvk.baramati@icar.gov.in',
      accreditationStatus: 'ICAR Quality Assured',
      supportedParameters: '12 Parameters + Water Quality',
      sampleCapacity: 12000,
      isActive: true
    }
  ];

  for (const lab of labs) {
    await prisma.laboratory.upsert({
      where: { id: lab.id },
      update: lab,
      create: lab
    });
  }
  console.log('✅ Seeded Verified Representative Laboratories');

  // 7. Seed Soil Health Cards with 12 Parameters & STCR Crop Recommendations
  const card1 = await prisma.soilHealthCard.upsert({
    where: { cardNumber: 'SHC/2026/PB/LDH/049182' },
    update: {},
    create: {
      cardNumber: 'SHC/2026/PB/LDH/049182',
      sampleNumber: 'SMP/2026/0892',
      farmerName: 'Gurpreet Singh',
      farmerPhone: '9876543210',
      stateId: 'st-punjab',
      districtId: 'dist-pb-ldh',
      subDistrictId: 'sub-jagraon',
      villageId: 'vil-sidhwan',
      khataNo: '142/3',
      khasraNo: '88/14-15',
      farmSizeHa: 2.4,
      irrigationSource: 'Tubewell',
      soilType: 'Alluvial Loam',
      laboratoryId: 'lab-ldh-01',
      collectionDate: new Date('2026-01-12'),
      testingDate: new Date('2026-01-24'),
      issueDate: new Date('2026-01-28'),
      cropSeason: 'Rabi 2025-26',
      status: CardStatus.ISSUED,
      testResult: {
        create: {
          pH: 7.4, pH_rating: 'Neutral',
          EC: 0.32, EC_rating: 'Normal',
          OC: 0.42, OC_rating: 'Low',
          N: 210, N_rating: 'Low',
          P: 16.5, P_rating: 'Medium',
          K: 295, K_rating: 'High',
          S: 8.5, S_rating: 'Low',
          Zn: 0.52, Zn_rating: 'Low',
          Fe: 5.8, Fe_rating: 'Medium',
          Cu: 0.65, Cu_rating: 'High',
          Mn: 3.4, Mn_rating: 'Medium',
          B: 0.42, B_rating: 'Low',
          testingMethod: 'Standard ICAR-IISS Wet Digestion Protocol',
          analystName: 'Dr. R. K. Sharma'
        }
      },
      recommendations: {
        create: [
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
      }
    }
  });

  const card2 = await prisma.soilHealthCard.upsert({
    where: { cardNumber: 'SHC/2026/UP/LKO/183921' },
    update: {},
    create: {
      cardNumber: 'SHC/2026/UP/LKO/183921',
      sampleNumber: 'SMP/2026/1943',
      farmerName: 'Rameshwar Prasad Yadav',
      farmerPhone: '9415012345',
      stateId: 'st-uttar-pradesh',
      districtId: 'dist-up-lko',
      subDistrictId: 'sub-bkt',
      villageId: 'vil-bhaisamau',
      khataNo: '78/2',
      khasraNo: '312/1',
      farmSizeHa: 1.8,
      irrigationSource: 'Canal & Tubewell',
      soilType: 'Sandy Loam',
      laboratoryId: 'lab-lko-01',
      collectionDate: new Date('2026-01-18'),
      testingDate: new Date('2026-01-29'),
      issueDate: new Date('2026-02-02'),
      cropSeason: 'Rabi 2025-26',
      status: CardStatus.ISSUED,
      testResult: {
        create: {
          pH: 7.8, pH_rating: 'Slightly Alkaline',
          EC: 0.45, EC_rating: 'Normal',
          OC: 0.38, OC_rating: 'Low',
          N: 185, N_rating: 'Low',
          P: 12.0, P_rating: 'Medium',
          K: 195, K_rating: 'Medium',
          S: 11.2, S_rating: 'Medium',
          Zn: 0.48, Zn_rating: 'Low',
          Fe: 6.2, Fe_rating: 'Medium',
          Cu: 0.42, Cu_rating: 'Medium',
          Mn: 2.8, Mn_rating: 'Medium',
          B: 0.35, B_rating: 'Low',
          testingMethod: 'Standard ICAR-IISS Wet Digestion Protocol',
          analystName: 'Dr. Sunita Verma'
        }
      },
      recommendations: {
        create: [
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
      }
    }
  });
  console.log('✅ Seeded Representative Soil Health Cards & 12 Parameter Results');

  // 8. Seed Resources & Guidelines
  const resources = [
    {
      id: 'res-sop-01',
      title: 'Standard Operating Procedure (SOP) for Soil Sample Collection & GPS Geo-tagging',
      description: 'Official procedure for collecting representative soil cores on 2.5ha irrigated / 10ha rainfed grid patterns.',
      category: ResourceCategory.SOP,
      language: 'English & Hindi',
      fileUrl: '/resources/sop_soil_sample_collection.pdf',
      fileSize: '2.4 MB'
    },
    {
      id: 'res-iot-02',
      title: 'Guidelines for Integration of IoT-enabled Digital Soil Testing Devices with Soil Health Portal',
      description: 'Technical specifications for automated laboratory telemetry integration.',
      category: ResourceCategory.TECHNICAL,
      language: 'English',
      fileUrl: '/resources/guidelines_iot_soil_devices.pdf',
      fileSize: '3.1 MB'
    },
    {
      id: 'res-nmnf-03',
      title: 'Advisory on Soil Health Management under National Mission on Natural Farming (NMNF)',
      description: 'Bio-inputs preparation and soil biology revitalization protocols.',
      category: ResourceCategory.CIRCULAR,
      language: 'Hindi & English',
      fileUrl: '/resources/nmnf_advisory_soil_health.pdf',
      fileSize: '1.8 MB'
    }
  ];

  for (const res of resources) {
    await prisma.resource.upsert({
      where: { id: res.id },
      update: res,
      create: res
    });
  }
  console.log('✅ Seeded Official Circulars & Resources');

  // 9. Seed Initial Support Ticket
  await prisma.supportTicket.upsert({
    where: { ticketNumber: 'TKT-108291' },
    update: {},
    create: {
      ticketNumber: 'TKT-108291',
      farmerName: 'Balwinder Singh',
      phone: '9814098140',
      category: 'Soil Health Card Not Received',
      description: 'Sample was collected in December 2025 by KVK team but printed card has not yet been delivered to village panchayat.',
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.MEDIUM,
      comments: {
        create: [
          {
            authorName: 'Support Officer (DAC&FW)',
            message: 'Sample test completed at Ludhiana STL on 15-Jan. Card printing queued for dispatch.',
            isInternal: false
          }
        ]
      }
    }
  });
  console.log('✅ Seeded Initial Demonstration Support Ticket');

  console.log('🎉 Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
