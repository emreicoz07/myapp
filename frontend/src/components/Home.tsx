import React from 'react';
import 'assets/css/Home.css'; // CSS dosyası

const Home: React.FC = () => (
  <div className="home-container">
    {/* Hero Section */}
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Beauty Center</h1>
        <p>Your beauty, our passion.</p> {/* Slogan */}
        <a href="/appointment" className="hero-button">
          Book Appointment
        </a>{' '}
        {/* Randevu Al Butonu */}
      </div>
    </section>

    {/* About Section */}
    <section className="about">
      <h2>About Us</h2>
      <p>
        We are a luxury beauty center offering a wide range of services to help
        you feel beautiful inside and out. From skincare to hair styling, we
        provide the best treatments with the highest quality products.
      </p>
    </section>

    {/* Services Section */}
    <section className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-item">
          <img src="/assets/images/nail.jpg" alt="Nail Care" />
          <h3>Nailcare</h3>
          <p>Professional Nail Care and styling to elevate your look.</p>
        </div>
        <div className="service-item">
          <img src="/assets/images/skin-care.jpg" alt="Skin Care" />
          <h3>Skincare</h3>
          <p>Luxury skincare treatments tailored to your needs.</p>
        </div>
        <div className="service-item">
          <img src="/assets/images/spa.jpg" alt="Spa Treatments" />
          <h3>Spa Treatments</h3>
          <p>Relax and unwind with our signature spa treatments.</p>
        </div>
      </div>
    </section>
  </div>
);
export default Home;
