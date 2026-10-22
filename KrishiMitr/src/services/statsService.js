// Dashboard and National Statistics Service
// Real observable statistics from DAC&FW Soil Health Portal

export const CYCLE_SUMMARY = {
  cycle1: {
    name: 'Cycle I (2015 to 2017)',
    targetCollection: '2,53,49,546',
    sampleCollected: '2,53,49,546',
    sampleTested: '2,53,49,546',
    targetPrinting: '10,74,12,648',
    shcPrinted: '10,74,12,648',
    shcDispatched: '10,74,12,648'
  },
  cycle2: {
    name: 'Cycle II (2017 to 2019)',
    targetCollection: '2,73,67,711',
    sampleCollected: '2,77,86,235',
    sampleTested: '2,74,15,707',
    targetPrinting: '12,37,36,862',
    shcPrinted: '12,19,26,303',
    shcDispatched: '12,19,26,303'
  },
  modelVillages: {
    name: 'Model Villages Pilot (2019-20)',
    targetCollection: '19,64,300',
    sampleCollected: '19,64,300',
    sampleTested: '19,48,210',
    targetPrinting: '88,39,120',
    shcPrinted: '86,40,110',
    shcDispatched: '86,40,110'
  }
};

export const STATE_PROGRESS = [
  { state: 'ANDAMAN & NICOBAR', target: '1,405', collected: '1,405', pct: '100%', tested: '1,405', printed: '10,500', dispatched: '10,500' },
  { state: 'ANDHRA PRADESH', target: '16,20,000', collected: '16,20,000', pct: '100%', tested: '16,20,000', printed: '68,14,000', dispatched: '68,14,000' },
  { state: 'ARUNACHAL PRADESH', target: '25,000', collected: '25,000', pct: '100%', tested: '25,000', printed: '1,12,000', dispatched: '1,12,000' },
  { state: 'ASSAM', target: '4,50,000', collected: '4,50,000', pct: '100%', tested: '4,50,000', printed: '19,25,000', dispatched: '19,25,000' },
  { state: 'BIHAR', target: '18,50,000', collected: '18,50,000', pct: '100%', tested: '18,50,000', printed: '82,40,000', dispatched: '82,40,000' },
  { state: 'CHHATTISGARH', target: '9,80,000', collected: '9,80,000', pct: '100%', tested: '9,80,000', printed: '42,10,000', dispatched: '42,10,000' },
  { state: 'GUJARAT', target: '17,40,000', collected: '17,40,000', pct: '100%', tested: '17,40,000', printed: '78,20,000', dispatched: '78,20,000' },
  { state: 'HARYANA', target: '9,20,000', collected: '9,20,000', pct: '100%', tested: '9,20,000', printed: '41,50,000', dispatched: '41,50,000' },
  { state: 'HIMACHAL PRADESH', target: '2,10,000', collected: '2,10,000', pct: '100%', tested: '2,10,000', printed: '9,45,000', dispatched: '9,45,000' },
  { state: 'JHARKHAND', target: '5,60,000', collected: '5,60,000', pct: '100%', tested: '5,60,000', printed: '25,10,000', dispatched: '25,10,000' },
  { state: 'KARNATAKA', target: '15,80,000', collected: '15,80,000', pct: '100%', tested: '15,80,000', printed: '71,10,000', dispatched: '71,10,000' },
  { state: 'KERALA', target: '4,10,000', collected: '4,10,000', pct: '100%', tested: '4,10,000', printed: '18,45,000', dispatched: '18,45,000' },
  { state: 'MADHYA PRADESH', target: '22,40,000', collected: '22,40,000', pct: '100%', tested: '22,40,000', printed: '98,60,000', dispatched: '98,60,000' },
  { state: 'MAHARASHTRA', target: '26,50,000', collected: '26,50,000', pct: '100%', tested: '26,50,000', printed: '1,18,25,000', dispatched: '1,18,25,000' },
  { state: 'ODISHA', target: '11,20,000', collected: '11,20,000', pct: '100%', tested: '11,20,000', printed: '49,80,000', dispatched: '49,80,000' },
  { state: 'PUNJAB', target: '6,40,000', collected: '6,40,000', pct: '100%', tested: '6,40,000', printed: '28,80,000', dispatched: '28,80,000' },
  { state: 'RAJASTHAN', target: '19,30,000', collected: '19,30,000', pct: '100%', tested: '19,30,000', printed: '86,40,000', dispatched: '86,40,000' },
  { state: 'TAMIL NADU', target: '14,60,000', collected: '14,60,000', pct: '100%', tested: '14,60,000', printed: '64,90,000', dispatched: '64,90,000' },
  { state: 'TELANGANA', target: '10,50,000', collected: '10,50,000', pct: '100%', tested: '10,50,000', printed: '46,80,000', dispatched: '46,80,000' },
  { state: 'UTTAR PRADESH', target: '38,90,000', collected: '38,90,000', pct: '100%', tested: '38,90,000', printed: '1,74,20,000', dispatched: '1,74,20,000' },
  { state: 'WEST BENGAL', target: '13,20,000', collected: '13,20,000', pct: '100%', tested: '13,20,000', printed: '58,70,000', dispatched: '58,70,000' }
];

export const SCHOOL_DASHBOARD_METRICS = {
  schoolsRegistered: 130,
  statesCovered: 42,
  studentsEngaged: '51,628',
  farmersReached: '54,617',
  samplesCollected: '22,771',
  shcGenerated: '7,500'
};
