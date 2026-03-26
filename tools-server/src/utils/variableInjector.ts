import { CustomerContext } from '../types/customer.types';
import { getAccountByNumber } from '../mock-data/accounts';
import { getCustomerByAccount } from '../mock-data/customers';

/**
 * Replace all template variables {{variable}} in a string with actual values
 */
export function injectVariables(
  template: string,
  context: Record<string, any>
): string {
  let result = template;

  // Replace all {{variable}} patterns
  Object.entries(context).forEach(([key, value]) => {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    const replacement = String(value);
    result = result.replace(placeholder, replacement);
  });

  return result;
}

/**
 * Build customer context from account number for variable injection
 */
export function buildCustomerContext(accountNumber: string): CustomerContext {
  const account = getAccountByNumber(accountNumber);
  const customer = getCustomerByAccount(accountNumber);

  if (!account || !customer) {
    throw new Error(`Account or customer not found for account number: ${accountNumber}`);
  }

  // Calculate minimum due (typically 10% of total or $25, whichever is greater)
  const minimumDue = Math.max(Math.round(account.totalDue * 0.1), 25);

  // Get last 4 digits of account
  const accountLastFour = accountNumber.slice(-4);

  // Format due date
  const dueDate = new Date(account.lastPaymentDate);
  dueDate.setDate(dueDate.getDate() + 30); // Due 30 days after last payment
  const dueDateStr = dueDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  return {
    customer_name: customer.name,
    account_number: accountNumber,
    total_due: account.totalDue,
    minimum_due: minimumDue,
    original_amount: account.originalAmount,
    days_past_due: account.daysPastDue,
    last_payment_date: new Date(account.lastPaymentDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    settlement_eligible: account.settlementEligible,
    settlement_amount: account.settlementAmount,
    product_type: 'credit card', // Could be made dynamic
    account_last_four: accountLastFour,
    due_date: dueDateStr
  };
}

/**
 * Get customer context by customer ID (for test scenarios)
 */
export function getCustomerContextById(customerId: string): CustomerContext {
  const customer = require('../mock-data/customers').getCustomerById(customerId);

  if (!customer) {
    throw new Error(`Customer not found: ${customerId}`);
  }

  return buildCustomerContext(customer.accountNumber);
}
