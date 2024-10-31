// routes/contact.ts
import express, { Request, Response, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { sendEmail } from '../controllers/mailController'; // `sendEmail` işlevini mailController'dan içe aktarıyoruz.

const router = express.Router();

// İletişim mesajı gönderme işlevi
const sendContactMessage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  // İstek doğrulama hatalarını kontrol ediyoruz
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

  // E-posta gönderme işlemi için `sendEmail` işlevini kullanıyoruz
  try {
    await sendEmail(
      process.env.ADMIN_EMAIL!, // Yöneticinin e-posta adresi (Çevre değişkeninden alınır)
      `New Contact Message from ${name}`, // Konu başlığı
      `Message from ${name} (${email}):\n\n${message}`, // Metin içeriği
    );

    // İletişim mesajı başarıyla gönderildikten sonra yanıt veriyoruz
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error: unknown) {
    console.error('Error sending email:', error);

    // E-posta gönderimi sırasında bir hata oluşursa, yanıt olarak hata mesajı veriyoruz
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

// POST `/send-message` rotasını tanımlıyoruz ve istek doğrulama ekliyoruz
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
