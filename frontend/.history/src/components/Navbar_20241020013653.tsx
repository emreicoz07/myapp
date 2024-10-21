import React, { useState } from 'react';
import './assets/css/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger ve kapatma ikonları

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.png" alt="Beauty Center Logo" />{' '}
        {/* Güzellik Merkezi Logosu */}
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <a href="/">Ana Sayfa</a>
        </li>
        <li>
          <a href="/services">Hizmetler</a>
        </li>
        <li>
          <a href="/about">Hakkımızda</a>
        </li>
        <li>
          <a href="/contact">İletişim</a>
        </li>
        <li>
          <a href="/appointment" className="appointment-button">
            Randevu Al
          </a>
        </li>{' '}
        {/* Randevu Butonu */}
      </ul>
    </nav>
  );
};

export default Navbar;
