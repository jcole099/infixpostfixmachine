import parser from '../components/parser';
import calcPostfix from '../components/postfix';
import React, { useState } from 'react';
import FunctionDescription from '../components/FunctionDescription';
import InputForm from '../components/InputForm';
import Result from '../components/Result';

function Convertpostfix({ setSteps, setStackHeight }) {
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
      stepResults = calcPostfix(dataArray, false);
      //error checking, stepResults = false if error
      if (stepResults) {
        //reset answer box to correct color
        let answerPrompt = document.getElementById('resultPrompt');
        answerPrompt.textContent = 'Result:';
        answerPrompt.classList.remove('error');
        answerPrompt.classList.add('correct');

        //TODO: make steps field grow to length of content
        document.getElementById('idSteps').style.display = 'flex';
        document.getElementById('idSteps').style.height = 'auto';
        document.getElementById('idSteps').style.paddingBottom = '10px';

        setSteps(stepResults[0]);
        setStackHeight(stepResults[1]);

        //display results
        let resultsArr = stepResults[stepResults.length - 2];
        let answer = resultsArr[resultsArr.length - 1].action[1];
        document.getElementById('answer').textContent = answer;
        console.log(`Result: ${answer}`);
      }
    }
  }

  return (
    <div>
      <div className="mainform conpostfixwindow" id="contest">
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
        <Result />
      </div>
    </div>
  );
}

export default Convertpostfix;
