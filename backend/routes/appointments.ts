import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment'; // MongoDB modelimizi import ediyoruz
import { sendEmail } from '../controllers/mailController'; // E-posta gönderim fonksiyonunu import ediyoruz

const router = express.Router();

// @route Post /api/appointments
// @desc  Create a new appointment and save to MongoDB
// @access Public
router.post(
  '/',
  [
    body('service').notEmpty().withMessage('Service is required'),
    body('date').isISO8601().toDate().withMessage('Invalid date format'),
    body('time').isLength({ min: 1 }).withMessage('Time is required'),
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('phone').isMobilePhone(['tr-TR', 'en-US']).withMessage('Invalid phone number'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Randevu verilerini alıyoruz
    const { service, date, time, customerName, email, phone } = req.body;
    const newAppointment = new Appointment({
      service,
      date,
      time,
      customerName,
      email,
      phone,
    });

    // MongoDB'ye kaydediyoruz
    try {
      await newAppointment.save();

      // E-posta gönderim işlemleri
      const adminEmail = 'admin@example.com'; // Yönetici e-posta adresi
      const customerEmail = email; // Müşterinin e-posta adresi

      // Müşteriye e-posta gönderiyoruz
      await sendEmail(
        customerEmail,
        'Appointment Confirmation',
        `Dear ${customerName},\n\nYour appointment for ${service} on ${date} at ${time} has been confirmed.`
      );

      // Yöneticilere e-posta gönderiyoruz
      await sendEmail(
        adminEmail,
        'New Appointment Created',
        `A new appointment has been created for ${customerName} (Email: ${email}). Service: ${service}, Date: ${date}, Time: ${time}.`
      );

      res.status(201).json({ message: 'Appointment created and saved to database successfully', newAppointment });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save appointment', error });
    }
  },
);

export default router;
