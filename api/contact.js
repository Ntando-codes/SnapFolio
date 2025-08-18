import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}