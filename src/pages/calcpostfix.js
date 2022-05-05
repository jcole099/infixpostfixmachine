import parser from '../components/parser';
import calcPostfix from '../components/postfix';
import React, { useState } from 'react';
import FunctionDescription from '../components/FunctionDescription';
import InputForm from '../components/InputForm';

function Calcpostfix({ setSteps, setStackHeight }) {
  const [userInput, setUserInput] = useState('');
  let stepResults = [];

  function checkEnter(event) {
    if (event.key === 'Enter') {
      startProcess();
    }
  }

  function startProcess() {
    const dataArray = parser(userInput, false);

    if (dataArray !== false) {
      stepResults = calcPostfix(dataArray, true);
      //error checking, stepResults = false if error
      if (stepResults) {
        //TODO: make steps field grow to length of content
        document.getElementById('idSteps').style.display = 'flex';
        document.getElementById('idSteps').style.height = 'auto';
        document.getElementById('idSteps').style.paddingBottom = '10px';

        setSteps(stepResults[0]);
        setStackHeight(stepResults[1]);
      }
    }
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
