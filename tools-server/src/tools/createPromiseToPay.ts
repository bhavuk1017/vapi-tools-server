export async function createPromiseToPay(params: {
  promiseDate: string;
  promiseAmount: number;
  customerPhone?: string;
}, metadata?: any): Promise<any> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 400));

  console.log(`[createPromiseToPay] Creating promise to pay:`, params);

  const referenceNumber = `PTP${Date.now()}`;

  // Calculate reminder date (2 days before promise date)
  const promiseDate = new Date(params.promiseDate);
  const reminderDate = new Date(promiseDate);
  reminderDate.setDate(reminderDate.getDate() - 2);

  return {
    success: true,
    message: `Perfect! I've recorded your commitment to pay ${params.promiseAmount} rupees by ${params.promiseDate}. Your reference number is ${referenceNumber}. You will receive a confirmation text message shortly with the details and payment instructions. I'll also set a reminder to follow up with you.`,
    referenceNumber: referenceNumber,
    promiseDate: params.promiseDate,
    promiseAmount: params.promiseAmount,
    reminderScheduled: true,
    reminderDate: reminderDate.toISOString().split('T')[0],
    confirmationSent: true
  };
}
