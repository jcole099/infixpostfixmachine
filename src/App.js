import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const year = new Date().getFullYear();
  const [userInput, setUserInput] = useState('');

  const decipherLoop = function () {
    console.log(userInput);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Infix Postfix Machine</h1>
      </header>
      <main className="App-main">
        <span>Testing, hello!</span>
        <form>
          <input
            type="text"
            id="userInput"
            size="100"
            onChange={(e) => setUserInput(e.target.value)}
          ></input>
          <input type="button" value="Calculate" onClick={decipherLoop}></input>
        </form>
      </main>
      <footer className="App-footer">
        <span>&copy; {year} James Cole</span>
      </footer>
    </div>
  );
}

export default App;
