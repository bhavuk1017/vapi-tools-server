export interface TestScenario {
  name: string;
  description: string;
  customerId: string;
  expectedOutcome: string;
  expectedTools: string[];
  testingGoals: string[];
}

export const TEST_SCENARIOS: TestScenario[] = [
  {
    name: 'Happy Path - Promise to Pay',
    description: 'Cooperative customer commits to payment',
    customerId: 'CUST001',
    expectedOutcome: 'promise_to_pay',
    expectedTools: ['createPromiseToPay', 'scheduleCallback', 'endCall'],
    testingGoals: [
      'Agent follows conversation flow correctly',
      'Agent captures payment commitment accurately',
      'Agent offers callback reminder',
      'Tone remains professional and helpful'
    ]
  },
  {
    name: 'Payment Already Made',
    description: 'Customer already paid but system not updated',
    customerId: 'CUST002',
    expectedOutcome: 'payment_recorded',
    expectedTools: ['recordPayment', 'endCall'],
    testingGoals: [
      'Agent quickly identifies payment situation',
      'Agent captures payment details correctly',
      'Call ends efficiently without unnecessary steps'
    ]
  },
  {
    name: 'Refuse to Pay - Settlement Eligible',
    description: 'Hostile customer, but eligible for settlement',
    customerId: 'CUST003',
    expectedOutcome: 'settlement_offered',
    expectedTools: ['checkSettlementEligibility', 'offerSettlement', 'scheduleCallback', 'endCall'],
    testingGoals: [
      'Agent maintains professionalism despite hostility',
      'Agent identifies settlement opportunity',
      'Settlement presented clearly and appealingly',
      'Agent doesn\'t become defensive or aggressive'
    ]
  },
  {
    name: 'Financial Hardship',
    description: 'Cooperative but experiencing financial difficulty',
    customerId: 'CUST004',
    expectedOutcome: 'settlement_offered',
    expectedTools: ['checkSettlementEligibility', 'offerSettlement', 'endCall'],
    testingGoals: [
      'Agent shows empathy and understanding',
      'Settlement presented as helpful solution',
      'Customer feels heard and respected'
    ]
  },
  {
    name: 'Confused Customer',
    description: 'Customer doesn\'t understand or recognize debt',
    customerId: 'CUST005',
    expectedOutcome: 'callback_scheduled',
    expectedTools: ['scheduleCallback', 'endCall'],
    testingGoals: [
      'Agent patiently explains situation',
      'Agent offers to send written documentation',
      'Agent doesn\'t pressure confused customer',
      'Callback scheduled for follow-up'
    ]
  }
];
