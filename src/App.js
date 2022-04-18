import './App.css';

//Import Dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Import Pages
import Calcpostfix from './pages/Calcpostfix.js';
import Convertpostfix from './pages/Convertpostfix.js';
import Convertinfix from './pages/Convertinfix.js';
import Steps from './components/Steps';

//Import Components
import Header from './components/Header';

function App() {
  const year = new Date().getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="App-main">
        <Routes>
          <Route path="/" exact element={<Calcpostfix />} />
          <Route path="/postfix2infix" exact element={<Convertpostfix />} />
          <Route path="/infix2postfix" exact element={<Convertinfix />} />
        </Routes>
        <Steps />
      </main>
      <footer className="App-footer">
        <span>&copy; {year} James Cole</span>
      </footer>
    </div>
  );
}

export default App;
