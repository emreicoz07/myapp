import React from 'react';
import { Helmet } from 'react-helmet';
import 'assets/css/Services.css'; // CSS dosyasını import ediyoruz

const ServiceDetails: React.FC = () => (
  <div>
    <Helmet>
      <title>Beauty Salon - Skincare Service</title>
      <meta
        name="description"
        content="Experience the best skincare treatments at our Beauty Salon."
      />
      <meta
        name="keywords"
        content="beauty salon, skincare, beauty treatments"
      />
    </Helmet>
    <h1>Skincare Services</h1>
    <p>
      Our skincare services will rejuvenate your skin and bring out your natural
      beauty.
    </p>
  </div>
);

const Services: React.FC = () => (
  <div className="services-container">
    <h1 className="services-title">Our Services</h1>
    <p className="services-subtitle">
      Explore the variety of beauty treatments we offer, tailored just for you.
    </p>

    <div className="services-grid">
      {/* Hizmet Kartları */}
      <div className="service-card">
        <img src="assets/images/skin-care300x300.png" alt="Skincare" />
        <h2>Skincare Treatments</h2>
        <p>Rejuvenate your skin with our luxurious skincare treatments.</p>
      </div>

      <div className="service-card">
        <img src="assets/images/hair.png" alt="Hair Styling" />
        <h2>Hair Styling</h2>
        <p>Get the perfect hairstyle that matches your personality.</p>
      </div>

      <div className="service-card">
        <img src="assets/images/spa.png" alt="Spa & Massage" />
        <h2>Spa & Massage</h2>
        <p>Relax and unwind with our premium spa and massage services.</p>
      </div>

      <div className="service-card">
        <img src="assets/images/nail.png" alt="Nailcare" />
        <h2>Nailcare</h2>
        <p>
          Look flawless for your special day with our professional Nail artists.
        </p>
      </div>
    </div>
  </div>
);

export default Services;
