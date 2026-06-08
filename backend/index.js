require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const AdmZip = require('adm-zip');

const app = express();

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false
}));

app.use(express.json());

// Set up multer to handle file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Email configuration
const createTransporter = async () => {
  // If SMTP config is present in .env, use that
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: parseInt(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback for testing: Ethereal Email (fake SMTP service)
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

// Root route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Merchant App Backend is running!', status: 'ok' });
});

// Email sending handler function
async function handleSendEmail(req, res) {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!email || !file) {
      return res.status(400).json({ error: 'Missing email or PDF file.' });
    }

    // Compress the PDF into a ZIP file in memory
    const zip = new AdmZip();
    zip.addFile('merchant_application.pdf', file.buffer);
    const zipBuffer = zip.toBuffer();

    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: '"Merchant App" <no-reply@merchantapp.local>',
      to: email,
      subject: 'Your Completed Merchant Application (Zipped)',
      text: 'Please find attached your completed merchant application inside the ZIP file. Extract it to view or edit the PDF.',
      html: '<p>Please find attached your completed <b>Merchant Application</b> inside the ZIP file.</p><p>Extract it to view or edit the PDF for your records.</p>',
      attachments: [
        {
          filename: 'merchant_application.zip',
          content: zipBuffer,
        },
      ],
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}

// Register both with and without trailing slash to avoid 308 redirects
app.post('/api/send-email/', upload.single('pdfFile'), handleSendEmail);
app.post('/api/send-email', upload.single('pdfFile'), handleSendEmail);

// ✅ CRITICAL FOR VERCEL: Export the app instead of calling app.listen()
// Vercel runs this as a serverless function — app.listen() will cause it to fail
module.exports = app;

// For local development: start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}