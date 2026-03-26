import { AccountDetails } from '../types/customer.types';

export const MOCK_ACCOUNTS: Record<string, AccountDetails> = {
  ACC123456: {
    number: 'ACC123456',
    customerId: 'CUST001',
    originalAmount: 1500.00,
    totalDue: 1725.00,
    daysPastDue: 45,
    lastPaymentDate: '2026-01-15',
    settlementEligible: false,
    status: 'delinquent',
    paymentHistory: []
  },
  ACC123457: {
    number: 'ACC123457',
    customerId: 'CUST002',
    originalAmount: 2500.00,
    totalDue: 2750.00, // Customer claims to have paid, but we need to verify
    daysPastDue: 60,
    lastPaymentDate: '2025-12-20',
    settlementEligible: false,
    status: 'delinquent',
    paymentHistory: []
  },
  ACC123458: {
    number: 'ACC123458',
    customerId: 'CUST003',
    originalAmount: 5000.00,
    totalDue: 6250.00,
    daysPastDue: 180,
    lastPaymentDate: '2025-08-01',
    settlementEligible: true,
    settlementAmount: 3125.00,
    settlementDiscount: 50,
    status: 'charged_off',
    paymentHistory: []
  },
  ACC123459: {
    number: 'ACC123459',
    customerId: 'CUST004',
    originalAmount: 3500.00,
    totalDue: 3850.00,
    daysPastDue: 90,
    lastPaymentDate: '2025-11-01',
    settlementEligible: true,
    settlementAmount: 2695.00,
    settlementDiscount: 30,
    status: 'delinquent',
    paymentHistory: []
  },
  ACC123460: {
    number: 'ACC123460',
    customerId: 'CUST005',
    originalAmount: 800.00,
    totalDue: 920.00,
    daysPastDue: 30,
    lastPaymentDate: '2026-01-01',
    settlementEligible: false,
    status: 'delinquent',
    paymentHistory: []
  },
  '123456789': {
    number: '123456789',
    customerId: 'CHINTAN001',
    originalAmount: 12000.00,
    totalDue: 12000.00,
    daysPastDue: 4,
    lastPaymentDate: '2026-02-01',
    settlementEligible: true,
    settlementAmount: 6000.00,
    settlementDiscount: 50,
    status: 'delinquent',
    paymentHistory: []
  }
};

// Helper function to get account by number
export function getAccountByNumber(accountNumber: string): AccountDetails | undefined {
  return MOCK_ACCOUNTS[accountNumber];
}

// Helper function to get account by customer ID
export function getAccountByCustomerId(customerId: string): AccountDetails | undefined {
  return Object.values(MOCK_ACCOUNTS).find(a => a.customerId === customerId);
}
