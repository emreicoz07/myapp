import express, { Request, Response, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment'; // MongoDB modelimizi import ediyoruz
import { sendEmail } from '../controllers/mailController'; // E-posta gönderim fonksiyonunu import ediyoruz

const router = express.Router();

// RequestHandler tipinde fonksiyon tanımlıyoruz
const createAppointment: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Hata detaylarını gösteriyoruz
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        message: err.msg, // Hata mesajını ilet
      })),
    });
    return;
  }

  const { service, date, time, customerName, email, phone } = req.body;
  const newAppointment = new Appointment({
    service,
    date,
    time,
    customerName,
    email,
    phone,
  });

  try {
    await newAppointment.save();

    // Müşteriye e-posta gönder
    await sendEmail(
      email,
      'Appointment Confirmation',
      `Dear ${customerName},\n\nYour appointment for ${service} on ${date} at ${time} has been confirmed.`,
    );

    // Yöneticilere e-posta gönder
    const adminEmail = 'admin@example.com';
    await sendEmail(
      adminEmail,
      'New Appointment Created',
      `A new appointment has been created for ${customerName} (Email: ${email}). Service: ${service}, Date: ${date}, Time: ${time}.`,
    );

    res.status(201).json({
      success: true,
      message:
        'Appointment created and saved successfully, confirmation email sent',
      newAppointment,
    });
  } catch (error: unknown) {
    console.error('Error saving appointment or sending emails:', error);

    // error nesnesinin bir hata nesnesi olup olmadığını kontrol ediyoruz
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Failed to save appointment or send emails',
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
  '/',
  [
    body('service').notEmpty().withMessage('Service is required'),
    body('date').isISO8601().toDate().withMessage('Invalid date format'),
    body('time').isLength({ min: 1 }).withMessage('Time is required'),
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone')
      .isMobilePhone(['tr-TR', 'en-US'])
      .withMessage('Invalid phone number format'),
  ],
  createAppointment,
);

export default router;
