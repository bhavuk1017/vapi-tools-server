import express from 'express';
import dotenv from 'dotenv';
import { toolHandler } from './handlers/toolHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'vapi-debt-collection-agent'
  });
});

// Tool webhook endpoint for VAPI
app.post('/api/tools', toolHandler);

// Call status webhook (optional - for monitoring)
app.post('/api/webhooks/status', (req, res) => {
  console.log('[Status Webhook] Call status update:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Tool webhook: http://localhost:${PORT}/api/tools`);
  console.log(`📊 Status webhook: http://localhost:${PORT}/api/webhooks/status`);
});

export default app;
