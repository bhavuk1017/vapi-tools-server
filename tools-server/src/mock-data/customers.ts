import { CustomerProfile } from '../types/customer.types';

export const MOCK_CUSTOMERS: Record<string, CustomerProfile> = {
  CUST001: {
    id: 'CUST001',
    name: 'John Smith',
    phone: '+919354763594', // Your phone number
    email: 'john.smith@email.com',
    accountNumber: 'ACC123456',
    preferredLanguage: 'en',
    tags: ['cooperative']
  },
  CUST002: {
    id: 'CUST002',
    name: 'Sarah Johnson',
    phone: '+919354763594', // Your phone number
    email: 'sarah.j@email.com',
    accountNumber: 'ACC123457',
    preferredLanguage: 'en',
    tags: ['cooperative', 'paid']
  },
  CUST003: {
    id: 'CUST003',
    name: 'Michael Brown',
    phone: '+919354763594', // Your phone number
    email: 'mbrown@email.com',
    accountNumber: 'ACC123458',
    preferredLanguage: 'en',
    tags: ['hostile', 'refuses']
  },
  CUST004: {
    id: 'CUST004',
    name: 'Emily Davis',
    phone: '+919354763594', // Your phone number
    email: 'emily.d@email.com',
    accountNumber: 'ACC123459',
    preferredLanguage: 'en',
    tags: ['cooperative', 'hardship']
  },
  CUST005: {
    id: 'CUST005',
    name: 'Robert Wilson',
    phone: '+919354763594', // Your phone number
    email: 'rwilson@email.com',
    accountNumber: 'ACC123460',
    preferredLanguage: 'en',
    tags: ['confused', 'elderly']
  }
};

// Helper function to get customer by account number
export function getCustomerByAccount(accountNumber: string): CustomerProfile | undefined {
  return Object.values(MOCK_CUSTOMERS).find(c => c.accountNumber === accountNumber);
}

// Helper function to get customer by ID
export function getCustomerById(customerId: string): CustomerProfile | undefined {
  return MOCK_CUSTOMERS[customerId];
}
