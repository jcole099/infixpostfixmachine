import parser from '../components/parser';
import convertInfix from '../components/infix';
import React, { useState } from 'react';
import FunctionDescription from '../components/FunctionDescription';
import InputForm from '../components/InputForm';
import Result from '../components/Result';

function Convertinfix({ setSteps, setStackHeight }) {
  const [userInput, setUserInput] = useState('');
  let stepResults = [];

  function checkEnter(event) {
    if (event.key === 'Enter') {
      startProcess();
    }
  }

  function startProcess() {
    const dataArray = parser(userInput, true);

    if (dataArray !== false) {
      stepResults = convertInfix(dataArray);
      //error checking, stepResults = false if error
      if (stepResults) {
        //reset answer box to correct color
        let answerPrompt = document.getElementById('resultPrompt');
        answerPrompt.textContent = 'Result:';
        answerPrompt.classList.remove('error');
        answerPrompt.classList.add('correct');

        //make steps field grow to length of content
        document.getElementById('idSteps').style.display = 'flex';
        document.getElementById('idSteps').style.height = 'auto';
        document.getElementById('idSteps').style.paddingBottom = '10px';

        setSteps(stepResults[0]);
        setStackHeight(stepResults[1]);

        //display results
        let resultsArr = stepResults[stepResults.length - 2];
        //solution to fix result being displayed as an array of two items [solutionPast, solutionUpdate]
        // let answer; 
        // let finalAnswer;
        // if (resultsArr[resultsArr.length - 1].currentSolution === 'object') {
        //   answer = (resultsArr[resultsArr.length - 1].currentSolution[0]) + ' ' + (resultsArr[resultsArr.length - 1].currentSolution[1]);
        //   finalAnswer = answer[0] + ' ' + answer[1];
        // } else {
        //   answer = resultsArr[resultsArr.length - 1].currentSolution;
        //   finalAnswer = answer;
        // }
        let answer = resultsArr[resultsArr.length - 1].currentSolution;
        let finalAnswer = answer[0] + ' ' + answer[1];
        
        document.getElementById('answer').textContent = finalAnswer;
        console.log(`Result: ${finalAnswer}`);
      }
    }
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
        <Result />
      </div>
    </div>
  );
}

export default Convertinfix;
