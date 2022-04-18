import parser from './../components/parser';
import calcPostfix from './../components/postfix';
import React, { useState } from 'react';
import FunctionDescription from '../components/FunctionDescription';
import InputForm from '../components/InputForm';

function Calcpostfix() {
  const [userInput, setUserInput] = useState('');

  function checkEnter(event) {
    if (event.key === 'Enter') {
      startProcess();
    }
  }

  function startProcess() {
    const dataArray = parser(userInput, false);

    if (dataArray !== false) calcPostfix(dataArray, true);
  }

  return (
    <div>
      <div className="mainform calcpostfixwindow">
        <FunctionDescription
          subtitle={'Calculate Postfix'}
          allowedOperators={' + - * / ^'}
          allowedNumbers={'Integers, Floats'}
        />
        <InputForm
          setUserInput={setUserInput}
          startProcess={startProcess}
          checkEnter={checkEnter}
          btnLabel={'Calculate'}
        />
      </div>
    </div>
  );
}

export default Calcpostfix;
