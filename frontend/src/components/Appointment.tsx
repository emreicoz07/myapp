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
  const [errors, setErrors] = useState<any[]>([]); // Hataları tutmak için bir state

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

    const data = await response.json();

    if (response.ok) {
      // Redux store'a randevuyu ekliyoruz
      dispatch(addAppointment(newAppointment));
      alert('Appointment successfully booked and confirmation email sent!');
      setErrors([]); // Hataları temizliyoruz
      // Formu temizliyoruz
      setService('');
      setDate('');
      setTime('');
      setCustomerName('');
      setEmail('');
      setPhone('');
    } else {
      // Backend'den gelen hataları state'e kaydediyoruz
      setErrors(data.errors || []);
    }
  };

  return (
    <div className="appointments-container">
      <h1>Book Your Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Hata mesajlarını göster */}
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((err, index) => (
              <p key={index} className="error">
                {err.message}
              </p>
            ))}
          </div>
        )}

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
