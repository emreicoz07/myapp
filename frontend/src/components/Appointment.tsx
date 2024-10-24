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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment = { service, date, time, customerName, email, phone };

    // Backend'e randevu gönderiyoruz
    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    });

    if (response.ok) {
      // Redux store'a randevuyu ekliyoruz
      dispatch(addAppointment(newAppointment));
      alert('Appointment successfully booked and confirmation email sent!');
    } else {
      alert('Error booking appointment');
    }

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

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
