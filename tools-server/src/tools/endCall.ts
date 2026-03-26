export async function endCall(params: {
  outcome: string;
  notes?: string;
}, metadata?: any): Promise<any> {
  console.log(`[endCall] Ending call with outcome: ${params.outcome}`);
  console.log(`[endCall] Notes: ${params.notes || 'None'}`);

  return {
    success: true,
    outcome: params.outcome,
    timestamp: new Date().toISOString(),
    summary: params.notes || `Call completed with outcome: ${params.outcome}`,
    callEnded: true
  };
}
