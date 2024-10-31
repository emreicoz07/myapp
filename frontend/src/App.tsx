import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Services from './components/Services';
import About from 'components/About';
import Appointment from 'components/Appointment';
import Contact from 'components/Contact';
import Footer from 'components/Footer';
import './App.css'; // App CSS'ini ekledik

const App: React.FC = () => (
  <Router>
    <div className="app-container">
      <Navbar /> {/* Navbar burada yer alacak */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Route */}
          <Route path="/services" element={<Services />} />{' '}
          {/* Services Route */}
          <Route path="/appointment" element={<Appointment />} />{' '}
          {/* Appointment Route */}
          <Route path="/about" element={<About />} /> {/* About Route */}
          <Route path="/contact" element={<Contact />} /> {/* Contact Route */}
        </Routes>
      </main>
      <Footer /> {/* Footer ekranın altında kalacak */}
    </div>
  </Router>
);

export default App;
