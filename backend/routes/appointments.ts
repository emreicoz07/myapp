import express, { Request, Response, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment';
import { sendEmail } from '../controllers/mailController';

const router = express.Router();

// Randevu oluşturma fonksiyonu
const createAppointment: RequestHandler = async (
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

  const { service, date, time, customerName, email, phone } = req.body;

  // Tarihi yeniden `Date` nesnesine dönüştürme
  const [day, month, year] = date.split('/');
  const formattedDate = new Date(`${year}-${month}-${day}`);

  if (isNaN(formattedDate.getTime())) {
    res.status(400).json({
      success: false,
      message: 'Invalid date format after conversion.',
    });
    return;
  }

  const newAppointment = new Appointment({
    service,
    date: formattedDate,
    time,
    customerName,
    email,
    phone,
  });

  try {
    await newAppointment.save();

    // E-posta içeriklerini daha detaylı ve formatlanmış şekilde gönderiyoruz
    await sendEmail(
      email,
      'Appointment Confirmation',
      `Dear ${customerName}, your appointment has been confirmed.`,
      `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2a9d8f;">Hello ${customerName},</h2>
            <p>Thank you for booking an appointment with us! Here are your appointment details:</p>
            
            <table style="width: 10%; max-width: 600px; margin-top: 10px; border-collapse: collapse;">
              <tr>
                <td style="padding: 2px; font-weight: bold; color: #2a9d8f;">Service:</td>
                <td style="padding: 2px;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 2px; font-weight: bold; color: #2a9d8f;">Date:</td>
                <td style="padding: 2px;">${formattedDate.toLocaleDateString(
                  'tr-TR',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  },
                )}</td>
              </tr>
              <tr>
                <td style="padding: 2px; font-weight: bold; color: #2a9d8f;">Time:</td>
                <td style="padding: 2px;">${time}</td>
              </tr>
            </table>
    
            <p style="margin-top: 20px;">
              If you have any questions or need to reschedule, please feel free to <a href="http://localhost:3000/contact" style="color: #2a9d8f; text-decoration: none;">contact us</a>.
            </p>
    
            <p style="margin-top: 20px; font-style: italic;">
              We look forward to seeing you!
            </p>
    
            <p style="color: #777; font-size: 0.9em; margin-top: 30px;">
              Best regards,<br/>
              Beauty Center Team
            </p>
          </body>
        </html>
      `,
    );

    // Yöneticilere e-posta gönder
    const adminEmail = 'admin@example.com';
    await sendEmail(
      adminEmail,
      'New Appointment Created',
      `A new appointment has been created for ${customerName} (Email: ${email}). Service: ${service}, Date: ${formattedDate.toLocaleDateString('tr-TR')}, Time: ${time}.`,
    );

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully and email sent!',
      newAppointment,
    });
  } catch (error: unknown) {
    console.error('Error saving appointment or sending emails:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to save appointment or send emails',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Rota tanımlaması
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
  createAppointment,
);

export default router;
