import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const year = new Date().getFullYear();
  const [userInput, setUserInput] = useState('');
  var userData = [];
  let convertInfix = false; //used for validation of parenthesis. Set to true if user is trying to convert Infix -> Postfix TODO: implement functionality to change this value when tabs change

  function isNumber(char) {
    if (
      char === '0' ||
      char === '1' ||
      char === '2' ||
      char === '3' ||
      char === '4' ||
      char === '5' ||
      char === '6' ||
      char === '7' ||
      char === '8' ||
      char === '9' ||
      char === '.'
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isValidNonNum(char) {
    if (
      char === '+' ||
      char === '-' ||
      char === '*' ||
      char === '/' ||
      char === '^' ||
      char === '(' ||
      char === ')' ||
      char === ' '
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isOperator(char) {
    if (
      char === '+' ||
      char === '-' ||
      char === '*' ||
      char === '/' ||
      char === '^' ||
      char === '(' ||
      char === ')'
    ) {
      return true;
    } else {
      return false;
    }
  }

  function isPar(char) {
    if (char === '(' || char === ')') {
      return true;
    } else {
      return false;
    }
  }

  const decipherLoop = function () {
    userData = [];
    console.log(userInput);
    let previousNum = null;
    for (let char of userInput) {
      if (isPar(char) && !convertInfix) {
        console.error(`Parenthesis are not allowed in this operation`);
        break;
      }

      if (isNumber(char)) {
        //VALID NUM

        //handle first el edge case where previousNum is index -1
        if (previousNum === null) {
          previousNum = char;
          continue;
        }

        //handle case where char is num, previous val is space
        if (previousNum === ' ') {
          previousNum = char;
          continue;
        }

        //handle case with no spaces - previousNum is operator, char is number
        if (isOperator(previousNum)) {
          userData.push(previousNum);
          previousNum = char;
          continue;
        }

        //left decision branch
        if (!isNaN(previousNum)) {
          previousNum += char;
          continue;
        } else {
          previousNum = char;
          continue;
        }
      } else if (isValidNonNum(char)) {
        //VALID OPERATOR

        //handle parenthesis in infix -> postfix FIXME:
        // if (convertInfix) {
        //   if (isPar(char)) {
        //     if (previousNum !== ' ' && previousNum !== null) {
        //       userData.push(previousNum);
        //     }
        //     previousNum = char;
        //     continue;
        //   }
        // }

        //handle multiple spaces between elements
        if (char === ' ' && previousNum === ' ') {
          continue;
        }

        //handle leading spaces edge case
        if (previousNum === null && char === ' ') {
          continue;
        }

        //VALIDATION
        //if prevnum is null, if char is not a parenthesis,
        if (previousNum === null && !isPar(char)) {
          console.error(`First value cannot be an operator [${char}]`);
          break;
        }
        //also invalid if prev = null, is parenthesis, is not convertInfix
        if (previousNum === null && isPar(char) && !convertInfix) {
          console.error(`First value cannot be an operator [${char}]`);
          break;
        }

        //handles case where there is no space between number and operator
        if (isOperator(char) && isNumber(previousNum)) {
          userData.push(parseFloat(previousNum));
          previousNum = char;
          continue;
        }

        if (char === ' ') {
          //parenthesis on end of the string
          if (isPar(previousNum)) {
            userData.push(previousNum);
            previousNum = char;
            continue;
          }

          //handle case where previousNum is an operator
          if (isOperator(previousNum)) {
            userData.push(previousNum); //FIXME: possible remove this line (testing)
            previousNum = char;
            continue;
          }
          previousNum = parseFloat(previousNum);
          userData.push(previousNum);
          previousNum = char;
          continue;
        } else {
          if (isOperator(char)) {
            if (isPar(char) && isOperator(previousNum)) {
              userData.push(previousNum);
              previousNum = char;
              continue;
            }

            //
            if (isPar(char) && previousNum === ' ') {
              previousNum = char;
              continue;
            }

            if (isPar(char) && previousNum === null) {
              previousNum = char;
              continue;
            }

            //Not sure what this does? FIXME:
            if (isPar(char) && !isNaN(previousNum)) {
              userData.push(parseFloat(previousNum));
              previousNum = char;
              continue;
            }

            //not sure what this is for. Par and space?
            if (isPar(char)) {
              previousNum === null ? userData.push(char) : (previousNum = char);
              continue;
            }

            //executes whe char is operator and prev is a space
            if (isOperator(char) && previousNum === ' ') {
              previousNum = char;
              continue;
            }

            if (isOperator(char) && isPar(previousNum)) {
              userData.push(previousNum);
              previousNum = char;
              continue;
            }

            if (isOperator(char) && isOperator(previousNum)) {
              userData.push(previousNum);
              previousNum = char;
              continue;
            }

            //when previousNum is a multi-digit value and char is an operator
            userData.push(parseFloat(previousNum));
            previousNum = char;
          } else if ((char === '(' || char === ')') && convertInfix) {
            continue;
          } else {
            console.error(`Invalid syntax! [${char}] is an illegal character`);
          }
        }
      } else {
        //NOT VALID
        console.error(`Not a valid char! [${char}]`);
        console.error(`No letters allowed`);
        console.error(`No commas allowed`);
        console.error(`Only use the following operators: + - * / ^ ( )`);
        //TODO: Display errors on the GUI
        return;
      }
    }

    console.log(userData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Infix Postfix Machine</h1>
      </header>
      <main className="App-main">
        <h2>Allowed Inputs</h2>
        <span>Numbers: 0 1 2 3 4 5 6 7 8 9 </span>
        <br></br>
        <span>Operators: + - * / ^ ( ) </span>
        <form>
          <input
            type="text"
            id="userInput"
            size="100"
            onChange={(e) => setUserInput(e.target.value + ' ')}
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
