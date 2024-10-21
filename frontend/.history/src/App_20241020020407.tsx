import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router bileşenlerini import ediyoruz
import TodoList from './components/TodoList'; // BACKENDEN GELEN BİLGİLER DEĞİŞTİRECEĞİM SONRA
import Navbar from './components/Navbar';
import Home from './components/Home';

const App: React.FC = () => (
  <div className="App">
    <Navbar /> {/* Navbar burada yer alacak */}
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home sayfası */}
      {/* Diğer sayfaları buraya ekleyebilirsin */}
    </Routes>
  </div>
);

export default App;
