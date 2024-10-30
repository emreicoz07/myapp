import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import appointmentsRouter from './routes/appointments'; // appointments rotasını ekliyoruz,
import contactRouter from './routes/contact';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB bağlantısı
mongoose
  .connect(MONGO_URI || '')
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err.message);
  });

// **CORS middleware'i ekliyoruz ve sadece bir defa kullanıyoruz**
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL'nizi burada belirtin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen başlıklar
    credentials: true, // Kimlik bilgileri ile istek yapılmasına izin veriyoruz
  }),
);

// Body parser kullanımı
app.use(bodyParser.json());

// Randevu rotası
app.use('/api/appointments', appointmentsRouter);

// Contact route
app.use('/api/contact', contactRouter);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
