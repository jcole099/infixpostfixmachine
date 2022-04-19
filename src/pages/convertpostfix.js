import parser from '../components/parser';
import calcPostfix from '../components/postfix';
import React, { useState } from 'react';
import FunctionDescription from '../components/FunctionDescription';
import InputForm from '../components/InputForm';

function Convertpostfix() {
  const [userInput, setUserInput] = useState('');

  function checkEnter(event) {
    if (event.key === 'Enter') {
      startProcess();
    }
  }

  function startProcess() {
    const dataArray = parser(userInput, false);

    if (dataArray !== false) calcPostfix(dataArray, false);
  }

  return (
    <div>
      <div className="mainform conpostfixwindow">
        <FunctionDescription
          subtitle={'Convert Postfix to Infix'}
          allowedOperators={' + - * / ^'}
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

export default Convertpostfix;
