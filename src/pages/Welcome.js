import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

function Welcome() {
  return (
    <div className="mainform">
      <div className='logoTitle2'>
        <img src={logo} alt="Infix Postfix Machine logo" className="tes"></img>
        <h2>Welcome to the Infix Postfix Machine</h2>
      </div>
      <p>Please select a function above to get started.</p>
      <p>
        For more information on how the Infix Postfix Machine works, go to our&nbsp;
        <Link to="/about"><span className='aboutLink'><b>About page</b></span></Link>.
      </p>
    </div>
  );
}

export default Welcome;
