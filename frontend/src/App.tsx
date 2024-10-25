import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router bileşenlerini import ediyorum
import Home from './components/Home';
import Navbar from './components/Navbar';
import Services from './components/Services';
<<<<<<< HEAD
import Appointment from 'components/Appoinment';
=======
import Appointment from 'components/Appointment';
>>>>>>> backup

const App: React.FC = () => (
  <Router>
    {/* Burada Router ile sarılı olmalı */}
    <div className="App">
      <Navbar /> {/* Navbar burada yer alacak */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Route */}
        <Route path="/services" element={<Services />} /> {/* Services Route */}
<<<<<<< HEAD
        <Route path="/appointment" element={<Appointment />} />{' '}
        {/* Appointment Route */}
        {/* Diğer sayfaları buraya ekleyebilirsin - You can Add another Pages here */}
=======
        <Route path="/appointment" element={<Appointment />} />
        {/* Appointment Route */}
>>>>>>> backup
      </Routes>
    </div>
  </Router>
);

export default App;
