export async function scheduleCallback(params: {
  callbackDate: string;
  callbackTime?: string;
  reason: string;
  customerPhone?: string;
}, metadata?: any): Promise<any> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log(`[scheduleCallback] Scheduling callback:`, params);

  const confirmationNumber = `CB${Date.now()}`;
  const phoneNumber = params.customerPhone || metadata?.customer_phone || 'the number on file';

  return {
    success: true,
    message: `I've scheduled a callback for ${params.callbackDate}${params.callbackTime ? ' at ' + params.callbackTime : ' during business hours'}. Your confirmation number is ${confirmationNumber}. We'll call you at ${phoneNumber}. Please make sure you're available, as it's important we discuss this overdue account.`,
    confirmationNumber: confirmationNumber,
    callbackDate: params.callbackDate,
    callbackTime: params.callbackTime || 'business hours (9 AM to 5 PM)',
    reason: params.reason,
    phoneNumber: phoneNumber,
    scheduled: true
  };
}
