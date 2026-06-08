# Merchant Application — Deployment Package

## Structure

```
deploy/
├── frontend/   → Deploy on Vercel
└── backend/    → Deploy on Railway (or Render)
```

## Quick Start

### 1. Backend → Railway
- Push `backend/` folder to its own GitHub repo
- Deploy on railway.app
- Set env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- Note your Railway URL

### 2. Frontend → Vercel
- Push `frontend/` folder to its own GitHub repo
- Deploy on vercel.com
- Set env var: REACT_APP_API_URL = your Railway URL
- Deploy

## ⚠️ Security Reminder
Regenerate your Gmail App Password before deploying.
Create one at: https://myaccount.google.com/apppasswords
