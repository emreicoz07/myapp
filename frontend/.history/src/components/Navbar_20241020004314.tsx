import React from 'react';
import './assets/css/Navbar.css';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <div className="navbar-logo">MyApp</div>
    <ul className="navbar-links">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </nav>
);
export default Navbar;
