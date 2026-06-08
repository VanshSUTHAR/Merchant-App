require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const AdmZip = require('adm-zip');

const app = express();

// Enable CORS for all origins (safe for this use case)
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
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback for testing: Ethereal Email (fake SMTP service)
  console.log('No SMTP credentials found in .env, generating Ethereal test account...');
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

// Root route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Merchant App Backend is running!', status: 'ok' });
});

// Email sending endpoint (both with and without trailing slash)
app.post('/api/send-email/', upload.single('pdfFile'), handleSendEmail);
app.post('/api/send-email', upload.single('pdfFile'), handleSendEmail);

async function handleSendEmail(req, res) {
  try {
    const { email } = req.body;
    const file = req.file;

    console.log('Email send request received:', { email, hasFile: !!file });

    if (!email || !file) {
      return res.status(400).json({ error: 'Missing email or PDF file.' });
    }

    // Compress the PDF into a ZIP file in memory
    const zip = new AdmZip();
    zip.addFile('merchant_application.pdf', file.buffer);
    const zipBuffer = zip.toBuffer();

    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: '"Merchant App" <no-reply@merchantapp.local>', // sender address
      to: email, // list of receivers
      subject: "Your Completed Merchant Application (Zipped)", // Subject line
      text: "Please find attached your completed merchant application inside the ZIP file. Extract it to view or edit the PDF.", // plain text body
      html: "<p>Please find attached your completed <b>Merchant Application</b> inside the ZIP file.</p><p>Extract it to view or edit the PDF for your records.</p>", // html body
      attachments: [
        {
          filename: 'merchant_application.zip',
          content: zipBuffer,
        }
      ]
    });

    console.log("Message sent: %s", info.messageId);

    // Provide a preview URL if using Ethereal email
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log("Preview URL: %s", previewUrl);
    }

    res.json({ success: true, message: 'Email sent successfully', previewUrl });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
