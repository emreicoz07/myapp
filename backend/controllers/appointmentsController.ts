import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

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

  // Gelen `date` değerini `dd/mm/yyyy` formatına göre ayrıştır
  const [day, month, year] = date.split('/');
  const formattedDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(formattedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date format after conversion.',
    });
  }

  const newAppointment: Appointment = {
    service,
    date: formattedDate.toLocaleDateString('tr-TR'), // Formatlanmış tarih burada ayarlanıyor
    time,
    customerName,
    email,
    phone,
  };

  appointments.push(newAppointment); // Randevuyu geçici olarak saklıyoruz

  res
    .status(201)
    .json({ message: 'Appointment created successfully!', newAppointment });
};
