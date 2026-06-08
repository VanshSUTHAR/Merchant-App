# Merchant App — Frontend

React app. Deploy on **Vercel**.

## Setup

1. Push this folder to a GitHub repo
2. Import repo on vercel.com → New Project
3. Framework Preset: **Create React App**
4. Add Environment Variable in Vercel dashboard:
   - Key: `REACT_APP_API_URL`
   - Value: your Railway/Render backend URL (e.g. `https://your-app.railway.app`)
5. Deploy

## Local dev

```bash
npm install
REACT_APP_API_URL=http://localhost:5000 npm start
```
