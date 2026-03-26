export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  accountNumber: string;
  preferredLanguage: string;
  tags: string[];
}

export interface PaymentRecord {
  date: string;
  amount: number;
  method: string;
  confirmationNumber: string;
}

export interface AccountDetails {
  number: string;
  customerId: string;
  originalAmount: number;
  totalDue: number;
  daysPastDue: number;
  lastPaymentDate: string;
  settlementEligible: boolean;
  settlementAmount?: number;
  settlementDiscount?: number;
  status: 'current' | 'delinquent' | 'charged_off';
  paymentHistory: PaymentRecord[];
}

export interface CustomerContext {
  customer_name: string;
  account_number: string;
  total_due: number;
  minimum_due: number;
  original_amount: number;
  days_past_due: number;
  last_payment_date: string;
  settlement_eligible: boolean;
  settlement_amount?: number;
  product_type: string;
  account_last_four: string;
  due_date: string;
}
