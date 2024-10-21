import React from 'react';
import './App.css';
import TodoList from './components/TodoList'; //BACKENDEN GELEN BİLGİLER DEĞİŞTİRECEĞİM SONRA
import Navbar from './components/Navbar';

const App: React.FC = () => (
  <div className="App">
      <Navbar /> {/* Navbar burada yer alacak */}
      <div className="content">
        <h1>Welcome to MyApp!</h1>
      </div>
    </div>
  );
};

export default App;
