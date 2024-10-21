import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router bileşenlerini import ediyorum
import Home from './components/Home';
import Navbar from './components/Navbar';

const App: React.FC = () => (
  <Router>
    {' '}
    {/* Burada Router ile sarılı olmalı */}
    <div className="App">
      <Navbar /> {/* Navbar burada yer alacak */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home sayfası */}
        {/* Diğer sayfaları buraya ekleyebilirsin */}
      </Routes>
    </div>
  </Router>
);

export default App;
