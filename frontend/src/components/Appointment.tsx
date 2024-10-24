import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'assets/css/Appointments.css';
import { addAppointment } from '../redux/slices/appointmentSlice';
import { AppDispatch } from '../redux/store';

const Appointment: React.FC = () => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Randevu verilerini dispatch ile Redux'a ekliyoruz
    dispatch(
      addAppointment({ service, date, time, customerName, email, phone }),
    );

    // Formu temizliyoruz
    setService('');
    setDate('');
    setTime('');
    setCustomerName('');
    setEmail('');
    setPhone('');

    alert('Appointment successfully booked!');
  };

  return (
    <div className="appointments-container">
      <h1>Book Your Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Service Selection */}
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

        {/* Date Selection */}
        <label>Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Time Selection */}
        <label>Select Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        {/* Customer Info */}
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

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
