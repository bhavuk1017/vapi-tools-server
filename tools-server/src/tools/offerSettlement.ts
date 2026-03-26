import { getAccountByNumber } from '../mock-data/accounts';

export async function offerSettlement(params: {
  accountNumber?: string;
  customerResponse?: string;
}, metadata?: any): Promise<any> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 600));

  console.log(`[offerSettlement] Offering settlement:`, params);

  // Try to get account number from params or metadata
  const accountNumber = params.accountNumber || metadata?.customer_context?.account_number;

  if (!accountNumber) {
    return {
      success: false,
      message: 'Unable to retrieve account information for settlement offer'
    };
  }

  const account = getAccountByNumber(accountNumber);

  if (!account || !account.settlementEligible) {
    return {
      success: false,
      message: 'Settlement offer not available for this account'
    };
  }

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 3);
  const expirationStr = expirationDate.toISOString().split('T')[0];

  const savings = account.totalDue - (account.settlementAmount || 0);

  return {
    success: true,
    message: `Good news! Based on your account history, you're eligible for a settlement offer. Your current balance is ${account.totalDue} rupees, but we can settle this account for a one-time payment of ${account.settlementAmount} rupees. That's a ${account.settlementDiscount} percent discount. This is a limited-time offer valid until ${expirationStr}.`,
    originalAmount: account.totalDue,
    settlementAmount: account.settlementAmount,
    discountPercentage: account.settlementDiscount,
    savings: savings,
    validUntil: expirationStr
  };
}
