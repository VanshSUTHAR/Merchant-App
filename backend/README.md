# Merchant App — Backend

Express.js server. Deploy on **Railway** (recommended) or Render.

## Setup on Railway

1. Push this folder to a GitHub repo
2. railway.app → New Project → Deploy from GitHub
3. Add Environment Variables in Railway dashboard:
   - `SMTP_HOST` = smtp.gmail.com
   - `SMTP_PORT` = 587
   - `SMTP_USER` = your Gmail address
   - `SMTP_PASS` = your Gmail App Password (myaccount.google.com/apppasswords)
4. Railway will auto-run `npm start`
5. Copy the deployed URL → paste as `REACT_APP_API_URL` in your Vercel frontend

## Local dev

```bash
npm install
cp .env.example .env   # fill in your SMTP values
node index.js
```

## ⚠️ Gmail App Password
Generate one at: https://myaccount.google.com/apppasswords
(Requires 2FA enabled on your Google account)
