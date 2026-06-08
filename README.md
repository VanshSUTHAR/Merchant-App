# Merchant Application Form Filler

This is a comprehensive web-based dashboard designed to seamlessly fill out a 10-page merchant processing agreement. It features a React frontend for the user interface and an Node.js/Express backend to handle email distribution.

## Features

- **Interactive Multi-Step Form**: Broken down into intuitive sections (Merchant Info, Contact Info, Owner Info, Officer Info, Processing Info, Product Info, Billing & Rates, Equipment & Sign).
- **PDF Generation**: Uses `pdf-lib` to overlay form data onto a vector PDF template directly in the browser.
- **Real-Time Validation**: Ensures all required fields and correct formats (SSN, Phone, Email, Routing Number) are provided before submission.
- **Email Delivery via Backend**: An Express backend that receives the completed PDF, compresses it into a ZIP file using `adm-zip`, and emails it to the customer using `nodemailer`. 
- **Auto-Configured Test Emails**: Supports custom SMTP configuration or automatically falls back to Ethereal Email for safe testing and previewing during development.
- **Form Progress Tracking**: A sidebar metadata panel tracks the completion status of mandatory fields.

## Prerequisites

- Node.js
- npm or yarn

## Getting Started

1. **Install Dependencies**
   Run the following command in the root directory to install both frontend and backend dependencies:
   ```bash
   npm install
   ```

2. **Environment Variables (Optional)**
   Create a `.env` file in the root directory to configure the SMTP settings for the email server. If no SMTP settings are provided, the backend will automatically generate an Ethereal Email test account for development.
   ```env
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   ```

3. **Run the Application**
   Start both the React frontend and the Express backend simultaneously using `concurrently`:
   ```bash
   npm start
   ```
   - The React frontend will run on `http://localhost:3000`
   - The Express backend will run on `http://localhost:5000`

## Technologies Used

- **Frontend**: React.js, `pdf-lib` (PDF generation & manipulation)
- **Backend**: Node.js, Express.js, `multer` (file upload handling), `nodemailer` (emailing), `adm-zip` (ZIP compression)
- **Tooling**: `concurrently` (running both servers with one command)
