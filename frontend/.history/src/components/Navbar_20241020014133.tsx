import React, { useState } from 'react';
import './assets/css/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.png" alt="Beauty Center Logo" />{' '}
        {/* Beauty Center Logo */}
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/appointment" className="appointment-button">
            Book Appointment
          </a>
        </li>{' '}
        {/* Book Appointment Button */}
      </ul>
    </nav>
  );
};

export default Navbar;
