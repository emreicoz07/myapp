import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router bileşenlerini import ediyorum
import Home from './components/Home';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Appointment from 'components/Appointment';

const App: React.FC = () => (
  <Router>
    {/* Burada Router ile sarılı olmalı */}
    <div className="App">
      <Navbar /> {/* Navbar burada yer alacak */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Route */}
        <Route path="/services" element={<Services />} /> {/* Services Route */}
        <Route path="/appointment" element={<Appointment />} />
        {/* Appointment Route */}
      </Routes>
    </div>
  </Router>
);

export default App;
