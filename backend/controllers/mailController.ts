import nodemailer from 'nodemailer';

// E-posta gönderim fonksiyonu
export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail kullanıyorsanız
    auth: {
      user: process.env.EMAIL_USER, // .env dosyanızda tanımlı olacak
      pass: process.env.EMAIL_PASS, // .env dosyanızda tanımlı olacak
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to, // Alıcı adresi (müşteri veya yönetici)
    subject, // E-posta başlığı
    text, // E-posta içeriği
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
