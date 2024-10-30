import React from 'react';
import { Helmet } from 'react-helmet';
import 'assets/css/About.css';

const About: React.FC = () => (
  <div className="about-container">
    <Helmet>
      <title>About Us - Beauty Center</title>
      <meta
        name="description"
        content="Learn more about our Beauty Center, mission, and values."
      />
      <meta name="keywords" content="beauty center, about us, beauty salon" />
    </Helmet>
    <section className="about-section">
      <h1>About Our Beauty Center</h1>
      <p>
        At Beauty Center, our mission is to enhance your beauty and well-being
        through luxurious, customized beauty services. Established in [Year], we
        have consistently strived to offer exceptional care with top-tier
        products and highly skilled professionals.
      </p>
      <h2>Our Values</h2>
      <p>
        We believe in providing a personalized experience where each client
        receives the care and attention they deserve. From skincare to hair
        styling, our aim is to make you feel pampered and revitalized every time
        you visit.
      </p>
      <h2>Meet Our Team</h2>
      <p>
        Our team consists of expert aestheticians, stylists, and beauty
        professionals who are passionate about their work. We believe that
        continuous training and development are key to staying updated with the
        latest trends and techniques.
      </p>
    </section>
  </div>
);

export default About;
