import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons
import { Link } from 'react-router-dom'; // Link bileşenini import ediyoruz
import 'assets/css/Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/images/logo4.png" alt="Beauty Center Logo" />{' '}
          {/* Beauty Center Logo */}
        </Link>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link> {/* "a" yerine "Link" kullanıldı */}
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/appointment" className="appointment-button">
            Book Appointment
          </Link>{' '}
          {/* "a" yerine "Link" */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
