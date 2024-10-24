import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Appointment türünü tanımlıyoruz
interface Appointment {
  service: string;
  date: Date;
  time: string;
  customerName: string;
  email: string;
  phone: string;
}

// appointments array'inin türü Appointment[] olacak şekilde belirleniyor
const appointments: Appointment[] = [];
//Mongo Database

// @route Post /api/appointments
// @desc  Create a new appointment
// @access Public
router.post(
  '/',
  [
    body('service').notEmpty().withMessage('Service is required'),
    body('date').isISO8601().toDate().withMessage('Invalid date format'),
    body('time').isLength({ min: 1 }).withMessage('Time is required'),
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('phone')
      .isMobilePhone(['tr-TR', 'en-US'])
      .withMessage('Invalid phone number'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    // Fonksiyonu async yaptık ve Promise<void> döndürüyoruz
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // Randevu verilerini alıyoruz
    const { service, date, time, customerName, email, phone } = req.body;
    const newAppointment = { service, date, time, customerName, email, phone };

    // Veritabanına kaydetme işlemi (mock ya da gerçek bir veritabanı)
    appointments.push(newAppointment);

    // Başarıyla tamamlanan durumda Response döndürülür
    res
      .status(201)
      .json({ message: 'Appointment created successfully', newAppointment });
  },
);
