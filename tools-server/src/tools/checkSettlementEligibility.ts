import { getAccountByNumber } from '../mock-data/accounts';

export async function checkSettlementEligibility(params: {
  accountNumber?: string;
  currentBalance?: number;
}, metadata?: any): Promise<any> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log(`[checkSettlementEligibility] Checking eligibility for:`, params);

  // Try to get account number from params or metadata
  const accountNumber = params.accountNumber || metadata?.customer_context?.account_number;

  if (!accountNumber) {
    return {
      eligible: false,
      reason: 'Account number not provided'
    };
  }

  // Get account from mock data
  const account = getAccountByNumber(accountNumber);

  if (!account) {
    return {
      eligible: false,
      reason: 'Account not found'
    };
  }

  return {
    eligible: account.settlementEligible,
    reason: account.settlementEligible
      ? `Account ${account.daysPastDue} days past due qualifies for settlement`
      : 'Account does not meet settlement criteria. Must be ninety plus days past due.',
    settlementAmount: account.settlementAmount,
    discountPercentage: account.settlementDiscount,
    accountNumber: accountNumber,
    daysPastDue: account.daysPastDue
  };
}
