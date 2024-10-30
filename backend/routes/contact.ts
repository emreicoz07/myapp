// routes/contact.ts
import express, { Request, Response, RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// RequestHandler tipinde fonksiyon tanımlıyoruz
const sendContactMessage: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        message: err.msg,
      })),
    });
    return;
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message from ${name}`,
    text: `Message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: 'Message sent successfully' });
  } catch (error: unknown) {
    console.error('Error sending email:', error);

    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to send message',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
        error: String(error),
      });
    }
  }
};

router.post(
  '/send-message',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  sendContactMessage,
);

export default router;
