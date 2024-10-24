import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
