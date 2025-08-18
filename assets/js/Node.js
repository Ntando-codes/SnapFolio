import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure your email transport (use your email credentials)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your.email@gmail.com',
      pass: 'your_app_password'
    }
  });

  let mailOptions = {
    from: email,
    to: 'your.email@gmail.com',
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error sending email.' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your.email@gmail.com',
      pass: 'your_app_password'
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'your.email@gmail.com',
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}