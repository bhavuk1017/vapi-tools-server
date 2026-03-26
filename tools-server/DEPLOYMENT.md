# Deployment Guide

This guide covers deploying your VAPI webhook server to free hosting platforms.

## 🚀 Quick Start: Render.com (Recommended)

### 1. Prepare Your Repository

```bash
# Initialize git if you haven't already
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/vapiagent.git
git push -u origin main
```

### 2. Deploy on Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `vapi-debt-agent`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

5. Add Environment Variables:
   - `VAPI_API_KEY` = Your VAPI API key
   - `VAPI_PHONE_NUMBER_ID` = Your VAPI phone number ID
   - `COMPANY_NAME` = Prime Financial Services
   - `AGENT_NAME` = Sarah

6. Click "Create Web Service"

### 3. Update VAPI Assistant

Once deployed, Render gives you a URL like `https://vapi-debt-agent.onrender.com`

Update your assistant to use the new URL:

```bash
# Update the assistant's tool server URLs
npm run update-server-url https://vapi-debt-agent.onrender.com

# Update .env locally
echo "SERVER_URL=https://vapi-debt-agent.onrender.com" >> .env
```

### 4. Test It

```bash
npm run test-call -- --scenario happy_path
```

---

## 🛠️ Alternative: Fly.io (Always-On)

### 1. Install Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
```

### 2. Login and Launch

```bash
fly auth login
fly launch
# Follow prompts - it will auto-detect Node.js
```

### 3. Set Environment Variables

```bash
fly secrets set VAPI_API_KEY=your-key
fly secrets set VAPI_PHONE_NUMBER_ID=your-phone-id
fly secrets set COMPANY_NAME="Prime Financial Services"
fly secrets set AGENT_NAME=Sarah
```

### 4. Deploy

```bash
fly deploy
```

Your app will be available at `https://your-app-name.fly.dev`

### 5. Update VAPI Assistant

```bash
npm run update-server-url https://your-app-name.fly.dev
```

---

## 🔄 Alternative: Railway.app

### 1. Deploy

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Node.js and deploys

### 2. Add Environment Variables

In Railway dashboard:
- Settings → Variables
- Add all env vars from `.env`

### 3. Get Your URL

- Settings → Domains → Generate Domain
- Copy the URL (e.g., `https://your-app.railway.app`)

### 4. Update Assistant

```bash
npm run update-server-url https://your-app.railway.app
```

---

## 📋 Checklist After Deployment

- [ ] Server is accessible (visit `https://your-url.com/health`)
- [ ] Environment variables are set correctly
- [ ] VAPI assistant tools updated with new server URL
- [ ] Test call works: `npm run test-call -- --scenario happy_path`
- [ ] Check VAPI dashboard for tool calls
- [ ] Verify tool responses in call logs

---

## 🐛 Troubleshooting

### Server Returns 502/504 Errors
- Check logs in hosting dashboard
- Verify `npm start` works locally: `npm run build && npm start`
- Ensure PORT is not hardcoded (use `process.env.PORT || 3000`)

### Tools Not Being Called
- Verify SERVER_URL is correct in VAPI assistant
- Check webhook logs for incoming requests
- Test webhook manually: `curl -X POST https://your-url.com/api/tools -H "Content-Type: application/json" -d '{"message":{"toolCallList":[]}}'`

### Cold Start Issues (Render)
- Free tier sleeps after 15 min inactivity
- First request after sleep takes ~30 seconds
- Consider upgrading to paid tier for always-on ($7/mo)

### Environment Variables Not Working
- Double-check spelling in hosting dashboard
- Restart the service after adding env vars
- Use `console.log(process.env.VAPI_API_KEY)` in code to debug

---

## 💰 Cost Comparison

| Platform | Free Tier | Stays Awake | Pros | Cons |
|----------|-----------|-------------|------|------|
| **Render** | 750 hrs/mo | ❌ (15 min idle) | Easy setup | Cold starts |
| **Fly.io** | 3 VMs | ✅ Always on | No cold starts | CLI required |
| **Railway** | $5 credit | ✅ ~1 month | Best DX | Not free long-term |
| **Cyclic** | Unlimited | ⚠️ Sometimes | Truly free | Occasional cold starts |

---

## 🔒 Production Checklist

When moving to production (real debt collection):

- [ ] Remove hardcoded phone numbers from mock data
- [ ] Implement proper customer lookup from database
- [ ] Add authentication to webhook endpoint
- [ ] Enable HTTPS only
- [ ] Add rate limiting
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Add proper error tracking
- [ ] Implement tool result validation
- [ ] Add audit logging for compliance
- [ ] Review FDCPA compliance in system prompt
- [ ] Test with real customers in sandbox mode first

---

## 📚 Resources

- [VAPI Documentation](https://docs.vapi.ai)
- [Render Docs](https://render.com/docs)
- [Fly.io Docs](https://fly.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
