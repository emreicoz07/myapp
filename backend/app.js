"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const appointments_1 = __importDefault(require("./routes/appointments")); // appointments rotasını ekliyoruz
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// MongoDB bağlantısı
mongoose_1.default
    .connect(MONGO_URI || '')
    .then(() => {
    console.log('MongoDB bağlantısı başarılı');
})
    .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err.message);
});
// **CORS middleware'i ekliyoruz ve sadece bir defa kullanıyoruz**
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Frontend URL'nizi burada belirtin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen başlıklar
    credentials: true, // Kimlik bilgileri ile istek yapılmasına izin veriyoruz
}));
// Body parser kullanımı
app.use(body_parser_1.default.json());
// Randevu rotası
app.use('/api/appointments', appointments_1.default);
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
