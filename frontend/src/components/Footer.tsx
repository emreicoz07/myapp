import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Sosyal medya ikonları için
import 'assets/css/Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <p className="footer-p">
      &copy; {new Date().getFullYear()} Beauty Center. All rights reserved.
    </p>
    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a
        href="https://www.instagram.com/nailartist.ss?igsh=MWk1bjB0eW4zaWFsYg=="
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
    </div>
  </footer>
);

export default Footer;
