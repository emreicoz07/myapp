// routes/appointments.ts
import express from 'express';
import { body } from 'express-validator';
import { createAppointment } from '../controllers/appointmentsController';

const router = express.Router();

router.post(
  '/',
  [
    body('service').notEmpty().withMessage('Service is required'),
    body('date').custom((value) => {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(value)) {
        throw new Error('Invalid date format. Expected dd/mm/yyyy');
      }
      return true;
    }),
    body('time').isLength({ min: 1 }).withMessage('Time is required'),
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone')
      .isMobilePhone(['tr-TR', 'en-US'])
      .withMessage('Invalid phone number format'),
  ],
  createAppointment, // createAppointment işlevini burada kullanıyoruz
);

export default router;
