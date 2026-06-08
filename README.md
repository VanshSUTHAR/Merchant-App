# Merchant Application PDF Generator

A full-stack web application for generating, managing, and emailing merchant applications as PDF documents. Built with React (frontend) and Express.js (backend), deployed on Vercel.

## 🎯 Features

- **Multi-step form** with 8 tabs for comprehensive merchant information collection
- **PDF generation** from form data using coordinate-based field mapping
- **Email integration** with SMTP support (Gmail, Ethereal for testing)
- **PDF compression** using ZIP files for email attachments
- **Form validation** with real-time error feedback
- **Responsive UI** with Bootstrap-based components
- **Production-ready** with Vercel deployment support

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **React Scripts** - Create React App build tool
- **PDF-lib** - PDF manipulation and generation
- **Bootstrap** - Responsive styling

### Backend
- **Express.js 5** - REST API server
- **Nodemailer** - Email service
- **Multer** - File upload handling
- **ADM-ZIP** - PDF compression
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Deployment
- **Vercel** - Serverless hosting for both frontend and backend

## 📋 Prerequisites

- **Node.js** ≥ 18.x
- **npm** or **yarn**
- **Git** for version control
- **Gmail Account** with App Password (for email sending)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Merchant-App
```

### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

## 💻 Running Locally

### Start Backend Server

```bash
cd backend
npm start
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

Frontend will open at `http://localhost:3000`

### Environment Variables (Local)

Create `.env.local` files for both frontend and backend:

**Backend (`backend/.env.local`):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
PORT=5000
```

**Frontend (`frontend/.env.local`):**
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📦 Project Structure

```
Merchant-App/
├── frontend/                 # React application
│   ├── public/              # Static files (PDF templates)
│   │   ├── MerchantApplication.pdf
│   │   ├── MerchantApplication_cleaned.pdf
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # React components (8 form tabs)
│   │   │   ├── MerchantInformation.jsx
│   │   │   ├── ContactInformation.jsx
│   │   │   ├── OwnerInformation.jsx
│   │   │   ├── OfficerInformation.jsx
│   │   │   ├── ProcessingInformation.jsx
│   │   │   ├── ProductInformation.jsx
│   │   │   ├── BillingInformation.jsx
│   │   │   └── EquipmentServices.jsx
│   │   ├── services/
│   │   │   └── pdfGenerator.js
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css
│   │   ├── index.js         # Entry point
│   │   ├── index.css
│   │   └── fields_mapping.json
│   ├── .env.local           # Local env (git ignored)
│   ├── .env.production      # Production env
│   ├── .gitignore
│   ├── package.json
│   ├── vercel.json          # Vercel config
│   └── README.md
│
├── backend/                  # Express API server
│   ├── index.js             # Main server file
│   ├── .env.local           # Local env (git ignored)
│   ├── .env.production      # Production env
│   ├── .gitignore
│   ├── package.json
│   ├── vercel.json          # Vercel config
│   └── README.md
│
├── .git/
├── .gitignore               # Root git ignore rules
└── README.md                # This file
```

## 📝 Form Structure (8 Tabs)

1. **Merchant Information** - Legal business name, DBA, tax ID, address
2. **Contact Information** - Contact person, phone, email, website
3. **Owner Information** - Primary owner personal details, SSN
4. **Officer Information** - Authorized officer/representative information
5. **Processing Information** - Payment processing preferences and volumes
6. **Product Information** - Products/services offered
7. **Billing & Rates** - Bank account details and pricing information
8. **Equipment & Signatures** - Digital signatures and agreement terms

## 🔌 API Endpoints

### Backend Endpoints

**POST `/api/send-email/`**
- Sends merchant application as PDF via email
- **Content-Type:** `multipart/form-data`
- **Body Parameters:**
  - `email` (string) - Recipient email address
  - `pdfFile` (file) - Generated PDF file
- **Response:**
  ```json
  {
    "success": true,
    "message": "Email sent successfully",
    "previewUrl": "https://..." // Ethereal preview URL (if in test mode)
  }
  ```

**GET `/`**
- Health check endpoint
- **Response:**
  ```json
  {
    "message": "Merchant App Backend is running!",
    "status": "ok"
  }
  ```

## 🌐 Deployment to Vercel

### Step 1: Prepare Code

Commit all changes:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### Step 2: Deploy Backend

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. **Root Directory:** `backend`
5. **Build Command:** (Leave empty - auto-detected)
6. **Add Environment Variables:**
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your-email@gmail.com
   SMTP_PASS = your-gmail-app-password
   ```
7. Click **"Deploy"**

**Note Backend URL:** e.g., `https://merchant-backend-five.vercel.app`

### Step 3: Deploy Frontend

1. Click **"Add New"** → **"Project"** (same repository)
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `build`
5. **Add Environment Variable:**
   ```
   REACT_APP_API_URL = https://your-backend-url.vercel.app
   ```
6. Click **"Deploy"**

**Your Frontend URL:** e.g., `https://merchant-frontend-orpin.vercel.app`

## 🔒 Environment Variables

### Backend

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | Yes | SMTP server host (e.g., smtp.gmail.com) |
| `SMTP_PORT` | Yes | SMTP port (587 for TLS, 465 for SSL) |
| `SMTP_USER` | Yes | SMTP username/email |
| `SMTP_PASS` | Yes | SMTP password or app-specific password |
| `PORT` | No | Server port (default: 5000, Vercel assigns automatically) |

### Frontend

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_API_URL` | Yes | Backend API URL (with trailing slash) |

## 🐛 Troubleshooting

### Email Not Sending
- ✅ Use Gmail App Password (not regular password)
- ✅ Create at: https://myaccount.google.com/apppasswords
- ✅ Enable 2-factor authentication on Gmail first
- ✅ Check SMTP credentials in Vercel environment variables

### PDF Not Generating
- ✅ Ensure `MerchantApplication_cleaned.pdf` exists in `frontend/public/`
- ✅ Check browser console for error details
- ✅ Verify `fields_mapping.json` has correct PDF coordinates

### API 308 Redirect Error
- ✅ Ensure backend API URL includes trailing slash: `/api/send-email/`
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Hard refresh browser (Ctrl+Shift+R)

### CORS Issues
- ✅ Backend CORS is pre-configured for all origins
- ✅ Check browser Network tab for blocked requests
- ✅ Verify frontend and backend URLs in environment variables

### Vercel Deployment Fails
- ✅ Ensure `.gitignore` excludes `node_modules` and `.env` files
- ✅ Check vercel.json configuration in both frontend and backend
- ✅ View Vercel deployment logs for specific errors

## 📧 Email Service Modes

The app supports two email modes:

### 1. Production (Gmail SMTP)
- Uses Gmail SMTP with App Password
- Sends real emails to recipient
- Preview URL not available
- Used in `.env.production`

### 2. Development (Ethereal Test Account)
- Automatically creates free test account
- Generates preview URL in console
- No real emails sent
- Used when no SMTP credentials configured

## 🔄 Development Workflow

```bash
# Terminal 1: Start Backend
cd backend
npm start
# Output: Backend server running on http://localhost:5000

# Terminal 2: Start Frontend
cd frontend
npm start
# Output: Compiled successfully! http://localhost:3000

# Code changes auto-reload thanks to npm watch

# Test email functionality:
# 1. Fill out all form fields
# 2. Click "Send PDF via Email"
# 3. Check browser console for messages
# 4. Ethereal preview URL appears in console
```

## 📄 Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

Output directory: `frontend/build/`
(Automatically deployed to Vercel)

**Backend:**
- No build step required
- Deployed as-is from source

## ✅ Testing Checklist

- [ ] All 8 form tabs display correctly
- [ ] Form validation prevents empty submissions
- [ ] PDF generates without console errors
- [ ] Email sends successfully
- [ ] Backend returns correct API responses
- [ ] CORS headers allow frontend requests
- [ ] Environment variables are set correctly in Vercel

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes locally
3. Test thoroughly: `npm start` in both frontend and backend
4. Commit changes: `git commit -m "Add your feature"`
5. Push to GitHub: `git push origin feature/your-feature`
6. Create a Pull Request

## 📞 Support

For issues or questions:
1. **Check the Troubleshooting section** above
2. **Review browser console** for error messages (F12)
3. **Check Vercel logs** in deployment dashboard
4. **Review server logs** locally with `npm start`
5. **Open an issue** in the repository with error details

## ⚠️ Security Reminders

- **Never commit `.env` files** - They're in `.gitignore`
- **Regenerate Gmail App Password** before production deploy
- **Use HTTPS only** - Vercel provides automatic SSL
- **Keep dependencies updated** - Run `npm update` regularly
- **Review CORS settings** - Currently allows all origins for development

## 📚 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [PDF-lib Documentation](https://pdf-lib.js.org)
- [Nodemailer Documentation](https://nodemailer.com)
- [Gmail App Passwords](https://myaccount.google.com/apppasswords)

## 📜 License

This project is private and proprietary.

---

**Last Updated:** June 8, 2026

**Live Deployments:**
- 🌐 Frontend: https://merchant-frontend-orpin.vercel.app
- 🔧 Backend: https://merchant-backend-five.vercel.app

**Repository:** [Editing Merchant-App/README](https://github.com)
