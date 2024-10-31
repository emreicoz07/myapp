import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/css/Appointments.css';
import {
  addAppointmentAsync,
  selectLoading,
  selectSuccess,
} from '../redux/slices/appointmentSlice';
import { AppDispatch } from '../redux/store';

const services = [
  {
    name: 'Manicure',
    description: 'Perfert for keeping your nails looking great',
    image: '/assets/images/spa.jpg',
  },
  {
    name: 'Pedicure',
    description: 'Relax and rejuvenate with our pedicure service.',
    image: '/assets/images/spa.jpg',
  },
  {
    name: 'Manicure + Pedicure',
    description: 'Get the best of both treatments.',
    image: '/assets/images/spa.jpg',
  },
  {
    name: 'Removal',
    description: 'Gentle removal of previous treatments.',
    image: '/assets/images/spa.jpg',
  },
];

const Appointment: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [showPopup, setShowPopup] = useState(false); // Pop-up görünümünü kontrol ediyoruz

  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const formattedDate = date.split('-').reverse().join('/');
    const newAppointment = {
      service: selectedService,
      date: formattedDate,
      time,
      customerName,
      email,
      phone,
    };

    dispatch(addAppointmentAsync(newAppointment));
  };

  // Pop-up mesajı belirli bir süre sonra otomatik olarak kapanır
  useEffect(() => {
    if (success) {
      setShowPopup(true); // Pop-up'ı göster
      setSelectedService('');
      setDate('');
      setTime('');
      setCustomerName('');
      setEmail('');
      setPhone('');
      const timer = setTimeout(() => {
        setShowPopup(false); // Belirli bir süre sonra gizle
      }, 3000); // 3 saniye

      return () => clearTimeout(timer); // Temizlik
    }
    return undefined;
  }, [success, dispatch]);

  return (
    <div className="appointments-container">
      <h1>Book Your Appointment</h1>

      {loading && (
        <p className="success*message">
          Booking your appointment, please wait...
        </p>
      )}
      {/* Service Cards */}
      <div className="app-service-options">
        {services.map((service) => (
          <div
            key={service.name}
            className={`app-service-card ${
              selectedService === service.name ? 'selected' : ''
            }`}
            onClick={() => setSelectedService(service.name)}
          >
            <img
              src={service.image}
              alt={service.name}
              className="app-service-image"
            />
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      {/* Randevu formu */}
      <form onSubmit={handleSubmit}>
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

      {/* Pop-up Mesajı */}
      {showPopup && (
        <div className="popup-background">
          <div className="popup">
            <p>Your appointment has been successfully booked!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
