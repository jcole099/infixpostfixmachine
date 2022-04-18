import parser from './../components/parser';
import convertInfix from './../components/infix';
import React, { useState } from 'react';
import FunctionDescription from '../components/FunctionDescription';
import InputForm from '../components/InputForm';

function Convertinfix() {
  const [userInput, setUserInput] = useState('');

  function checkEnter(event) {
    if (event.key === 'Enter') {
      startProcess();
    }
  }

  function startProcess() {
    const dataArray = parser(userInput, true);

    if (dataArray !== false) convertInfix(dataArray);
  }

  return (
    <div>
      <div className="mainform coninfixwindow">
        <FunctionDescription
          subtitle={'Convert Infix to Postfix'}
          allowedOperators={' + - * / ^ ( )'}
          allowedNumbers={'Integers, Floats'}
        />
        <InputForm
          setUserInput={setUserInput}
          startProcess={startProcess}
          checkEnter={checkEnter}
          btnLabel={'Convert'}
        />
      </div>
    </div>
  );
}

export default Convertinfix;
