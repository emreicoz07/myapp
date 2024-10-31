import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/css/Appointments.css';
import {
  addAppointmentAsync,
  selectLoading,
  selectSuccess,
} from '../redux/slices/appointmentSlice';
import { AppDispatch } from '../redux/store';

const Appointment: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Loading ve Success durumlarını Redux'tan alıyoruz
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Tarihi uygun formata çeviriyoruz
    const formattedDate = date.split('-').reverse().join('/');
    const newAppointment = {
      service,
      date: formattedDate,
      time,
      customerName,
      email,
      phone,
    };

    // Randevu ekleme işlemini başlatıyoruz
    dispatch(addAppointmentAsync(newAppointment));

    // Formu temizliyoruz
    setService('');
    setDate('');
    setTime('');
    setCustomerName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="appointments-container">
      <h1>Book Your Appointment</h1>

      {loading && <p>Booking your appointment, please wait...</p>}
      {success && <p>Your appointment has been successfully booked!</p>}
      {!loading && !success && (
        <form onSubmit={handleSubmit}>
          <label>Choose a Service:</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select a Service</option>
            <option value="Skincare">Skincare Treatment</option>
            <option value="Hair">Hair Styling</option>
            <option value="Spa">Spa & Massage</option>
            <option value="Nailcare">Nailcare</option>
          </select>

          <label>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Select Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Book Appointment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Appointment;
