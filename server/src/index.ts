import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import path from 'path';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    if (!token) {
      console.error('No reCAPTCHA token provided');
      return false;
    }

    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY || '',
      response: token,
    });

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?${params.toString()}`
    );

    console.log('reCAPTCHA response:', response.data);

    if (!response.data.success) {
      console.error('reCAPTCHA verification failed:', response.data['error-codes']);
    }

    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Request resume download
app.post('/api/request-resume', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Generate download token
    const token = jwt.sign(
      { email, timestamp: Date.now() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Create download link
    const downloadLink = `${process.env.FRONTEND_URL}/download-resume/${token}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Resume Download Link - Seife Bekele',
      html: `
        <h2>Thank you for your interest in my resume!</h2>
        <p>Click the link below to download my resume (link expires in 24 hours):</p>
        <a href="${downloadLink}">Download Resume</a>
        <p>Best regards,<br>Seife Bekele</p>
      `,
    });

    return res.json({ message: 'Download link sent to your email' });
  } catch (error) {
    console.error('Error sending resume download link:', error);
    return res.status(500).json({ message: 'Failed to send download link' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, recaptchaToken } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me - Seife Bekele',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Seife Bekele</p>
      `,
    });

    return res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact form:', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
});

// Verify and download resume
app.get('/api/download-resume/:token', (req, res) => {
  try {
    const { token } = req.params;

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Send resume file
    const resumePath = path.join(__dirname, '../assets/resume.pdf');
    return res.download(resumePath, 'seife-bekele-resume.pdf');
  } catch (error) {
    console.error('Error downloading resume:', error);
    return res.status(401).json({ message: 'Invalid or expired download link' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
