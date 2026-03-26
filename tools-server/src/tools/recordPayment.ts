export async function recordPayment(params: {
  paymentDate: string;
  paymentMode: string;
  amount: number;
  confirmationNumber?: string;
}, metadata?: any): Promise<any> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  console.log(`[recordPayment] Recording payment:`, params);

  const confirmationNum = params.confirmationNumber || `CONF${Date.now()}`;

  return {
    success: true,
    message: `Thank you. I've recorded your payment of ${params.amount} rupees made on ${params.paymentDate} via ${params.paymentMode}. Your payment will be processed within three to five business days. Your confirmation number is ${confirmationNum}.`,
    confirmationNumber: confirmationNum,
    processingTime: '3-5 business days',
    paymentDate: params.paymentDate,
    paymentMode: params.paymentMode,
    amount: params.amount,
    remainingBalance: 0.00
  };
}
