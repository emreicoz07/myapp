import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sendAppointmentEmail } from './mailController'; // E-posta fonksiyonunu import ediyoruz

interface Appointment {
  service: string;
  date: string;
  time: string;
  customerName: string;
  email: string;
  phone: string;
}

const appointments: Appointment[] = []; // Geçici bir veri kaynağı (veritabanı yerine)

export const createAppointment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { service, date, time, customerName, email, phone } = req.body;

  const newAppointment: Appointment = {
    service,
    date,
    time,
    customerName,
    email,
    phone,
  };

  appointments.push(newAppointment); // Randevuyu geçici olarak saklıyoruz

  // E-posta gönderme işlemi
  await sendAppointmentEmail(newAppointment);

  res
    .status(201)
    .json({ message: 'Appointment created successfully!', newAppointment });
};
