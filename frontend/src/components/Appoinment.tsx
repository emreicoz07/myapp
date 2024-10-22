import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'assets/css/Appointment.css'; // CSS dosyası

const Appointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedExpert, setSelectedExpert] = useState('');

  const services = ['Skincare', 'Hair Styling', 'Spa & Massage', 'Makeup'];
  const experts = ['John Doe', 'Jane Smith', 'Mark Wilson'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic goes here
    alert(
      `Appointment·booked·on·${selectedDate}·for·${selectedService}·with·${selectedExpert}`,
    );
  };

  return (
    <div className="appointment-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Takvim seçimi */}
        <div className="form-group">
          <label htmlFor="date">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            minDate={new Date()}
            className="date-picker"
          />
        </div>

        {/* Hizmet seçimi */}
        <div className="form-group">
          <label htmlFor="service">Select Service</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Uzman seçimi */}
        <div className="form-group">
          <label htmlFor="expert">Select Expert</label>
          <select
            id="expert"
            value={selectedExpert}
            onChange={(e) => setSelectedExpert(e.target.value)}
          >
            <option value="">Select an expert</option>
            {experts.map((expert) => (
              <option key={expert} value={expert}>
                {expert}
              </option>
            ))}
          </select>
        </div>

        {/* Randevu butonu */}
        <button type="submit" className="appointment-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
