import React, { useState } from 'react';
import 'assets/css/Contact.css';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // Durum mesajı için ek alan

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending your message...'); // Gönderim durumu mesajı

    const contactData = { name, email, message };

    try {
      const response = await fetch(
        'http://localhost:5000/api/contact/send-message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setStatus('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus(`Failed to send message: ${result.message}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us for any questions or feedback.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      {/* Durum mesajını kullanıcıya gösterme */}
      {status && <p>{status}</p>}
      <h2>Our Location</h2>
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d958.2709188481681!2d14.499781269642273!3d35.912631084459555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDU0JzQ1LjUiTiAxNMKwMzAnMDEuNSJF!5e1!3m2!1sen!2smt!4v1729863776615!5m2!1sen!2smt"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          title="Google Maps - Beauty Center"
        ></iframe>
        {/* Google Haritalar'da açma bağlantısı */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <a
            href="https://maps.app.goo.gl/szFZZM42jXLdkRne9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: 'blue',
              textDecoration: 'none',
              fontSize: '1em',
              borderRadius: '5px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            Open on Google Maps
            <p>218, La Rosa Building, St. Helen Street, Sliema SLM 2137. </p>
          </a>
        </div>
      </div>

      <div className="working-hours">
        <h2>Working Hours</h2>
        <ul>
          <li>Monday - Friday: 09:00 - 18:00</li>
          <li>Saturday: 10:00 - 17:00</li>
          <li>Sunday: Closed</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
