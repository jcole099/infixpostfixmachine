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

  /////////////////////////////////////////////
  // decipherLoop
  //
  // Handles converting a string to a data array.
  // Checks for basic syntax validation.
  // Function specific syntax validation will be deferred to their
  // respective functions.
  //
  const decipherLoop = function () {
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    userData = [];
    let previousEl = null;
    for (let char of userInput) {
      if (isPar(char) && !convertInfix) {
        console.error(`Parenthesis are not allowed in this operation`);
        break;
      }
      if (isNumber(char)) {
        //VALID NUM
        //case with multiple consecutive periods
        if (previousEl !== null) {
          if (char === '.' && previousEl[previousEl.length - 1] === '.') {
            console.error(
              `Invalid Syntax. Cannot have 2 or more periods next to each other.`
            );
            break;
          }
        }
        //handle first el edge case where previousEl is index -1
        if (previousEl === null) {
          previousEl = char;
          continue;
        }
        //handle case where char is num, previous val is space
        if (previousEl === ' ') {
          previousEl = char;
          continue;
        }
        //handle case where there is no zero infront of decimal
        if (previousEl === '.' && isNumber(char)) {
          previousEl += char;
          continue;
        }
        //handle case with no spaces - previousEl is operator, char is number
        if (isOperator(previousEl)) {
          userData.push(previousEl);
          previousEl = char;
          continue;
        }
        //left decision branch
        if (!isNaN(previousEl)) {
          previousEl += char;
          continue;
        } else {
          previousEl = char;
          continue;
        }
      } else if (isValidNonNum(char)) {
        //VALID OPERATOR
        //handle multiple spaces between elements
        if (char === ' ' && previousEl === ' ') {
          continue;
        }
        //handle leading spaces edge case
        if (previousEl === null && char === ' ') {
          continue;
        }
        //VALIDATION
        //if prevnum is null, if char is not a parenthesis,
        if (previousEl === null && !isPar(char)) {
          console.error(`First value cannot be an operator [${char}]`);
          break;
        }
        //also invalid if prev = null, is parenthesis, is not convertInfix
        if (previousEl === null && isPar(char) && !convertInfix) {
          console.error(`First value cannot be an operator [${char}]`);
          break;
        }
        //handles case where there is no space between number and operator
        if (isOperator(char) && isNumber(previousEl)) {
          userData.push(parseFloat(previousEl));
          previousEl = char;
          continue;
        }
        if (char === ' ') {
          //parenthesis on end of the string
          if (isPar(previousEl)) {
            userData.push(previousEl);
            previousEl = char;
            continue;
          }
          //handle case where previousEl is an operator
          if (isOperator(previousEl)) {
            userData.push(previousEl);
            previousEl = char;
            continue;
          }
          previousEl = parseFloat(previousEl);
          userData.push(previousEl);
          previousEl = char;
          continue;
        } else {
          if (isOperator(char)) {
            if (isPar(char) && isOperator(previousEl)) {
              userData.push(previousEl);
              previousEl = char;
              continue;
            }
            //
            if (isPar(char) && previousEl === ' ') {
              previousEl = char;
              continue;
            }
            if (isPar(char) && previousEl === null) {
              previousEl = char;
              continue;
            }
            if (isPar(char) && !isNaN(previousEl)) {
              userData.push(parseFloat(previousEl));
              previousEl = char;
              continue;
            }
            //Handles Par and space.
            if (isPar(char)) {
              previousEl === null ? userData.push(char) : (previousEl = char);
              continue;
            }
            //executes whe char is operator and prev is a space
            if (isOperator(char) && previousEl === ' ') {
              previousEl = char;
              continue;
            }
            if (isOperator(char) && isPar(previousEl)) {
              userData.push(previousEl);
              previousEl = char;
              continue;
            }
            if (isOperator(char) && isOperator(previousEl)) {
              userData.push(previousEl);
              previousEl = char;
              continue;
            }
            //when previousEl is a multi-digit value and char is an operator
            userData.push(parseFloat(previousEl));
            previousEl = char;
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

    console.log(`DL User Input: ${userInput}`);
    console.log(`DL User Data: ${userData}`);

    //calculatePostfix(userData, false);
    convertInfix(userData);
  };

  /////////////////////////////////////////////
  //calculatePostfix
  //
  // Calculates/converts a Postfix expression.
  // First parameter is an array of data to be converted (numbers and operators)
  // Second parameter is boolean, true = calculate | false = convert
  //
  function calculatePostfix(dataArray, calculate) {
    //TODO: check 10 5 + 7 - 8 conversion
    let stack = [];
    let topEl;
    let bottomEl;
    let calcNumResult;
    let calcString;
    let conversionString;

    for (let i = 0; i < dataArray.length; i++) {
      //if its a number
      if (!isNaN(dataArray[i])) {
        //Number
        stack.push(dataArray[i]);
        if (i === dataArray.length - 1) {
          //VALIDATION
          if (stack.length > 1) {
            console.error(
              `Invalid Postfix syntax - Multiple items on stack at end of process`
            );
            console.error(`CP STACK: ${stack}`);
          } else {
            console.log(`CP Result: ${stack[0]}`);
          }
        }
        continue;
      } else {
        //Operand

        //VALIDATION - Verify that there are two elements on stack
        if (stack.length < 2) {
          console.error(`Invalid Postfix syntax - Need two elements on Stack`);
          console.error(`CP STACK: ${stack}`);
        }

        if (i === dataArray.length - 1) {
          //VALIDATION
          if (!isNaN(dataArray[i])) {
            console.error(
              `Invalid Postfix syntax - Last element must be operator`
            );
            console.error(`CP STACK: ${stack}`);
          }
        }

        //CALCULATION
        topEl = stack.pop();
        bottomEl = stack.pop();

        if (calculate) {
          calcString = bottomEl + ' ' + dataArray[i] + ' ' + topEl;
          console.log(`CP Calculation String: ${calcString}`); //TESTING
        } else {
          conversionString =
            '(' + bottomEl + ' ' + dataArray[i] + ' ' + topEl + ')';
          console.log(`CP Conversion String: ${conversionString}`); //TESTING
        }

        //Select operation based on string operator
        if (calculate) {
          if (dataArray[i] === '+') {
            calcNumResult = bottomEl + topEl;
          } else if (dataArray[i] === '-') {
            calcNumResult = bottomEl - topEl;
          } else if (dataArray[i] === '*') {
            calcNumResult = bottomEl * topEl;
          } else if (dataArray[i] === '/') {
            calcNumResult = bottomEl / topEl;
          } else if (dataArray[i] === '^') {
            calcNumResult = Math.pow(bottomEl, topEl);
          }

          stack.push(calcNumResult);
        } else {
          stack.push(conversionString);
        }

        //Last iteration - Print result
        if (i === dataArray.length - 1) {
          //VALIDATION
          if (stack.length > 1) {
            console.error(
              `Invalid Postfix syntax - Multiple items on stack at end of process`
            );
            console.error(`CP STACK: ${stack}`);
          } else {
            console.log(`CP Result: ${stack[0]}`);
          }
        }
      }
    }
  }

  function isHigherPrecedence(val1, val2) {
    //assign number rank to each operator
    //compare number ranks
    let val1Rank, val2Rank;
    if (val1 === '=') val1Rank = 0;
    if (val2 === '=') val2Rank = 0;

    if (val1 === '(') val1Rank = 1;
    if (val2 === '(') val2Rank = 1;

    if (val1 === '+') val1Rank = 2;
    if (val2 === '+') val2Rank = 2;

    if (val1 === '-') val1Rank = 2;
    if (val2 === '-') val2Rank = 2;

    if (val1 === '*') val1Rank = 3;
    if (val2 === '*') val2Rank = 3;

    if (val1 === '/') val1Rank = 3;
    if (val2 === '/') val2Rank = 3;

    if (val1 === '^') val1Rank = 4;
    if (val2 === '^') val2Rank = 4;

    return val1Rank > val2Rank;
  }

  function convertInfix(dataArray) {
    let stack = [];
    let result = '';
    let tempVal;

    for (let i = 0; i < dataArray.length - 1; i++) {
      let currentEl = dataArray[i];

      //End of input?
      if (i === dataArray.length - 1) {
        //Validation check #2
        if (isNaN(currentEl)) {
          console.error(
            'Invalid Syntax - cannot have operator at the end of the input (for Infix)'
          );
          return;
        }

        for (let j = 0; j < stack.length - 1; j++) {
          result += ' ' + stack.pop();
        }
        break;
      }

      //Is an operand?
      if (!isNaN(currentEl)) {
        result += ' ' + currentEl;
        continue;
      } else {
        //Is it an opening parenth?
        if (currentEl === '(') {
          stack.push(currentEl);
          continue;
        } else {
          if (currentEl === ')') {
            //loop through stack looking for opening parenth
            for (let k = stack.length - 1; k > 0; k--) {
              if (stack[k] === '(') {
                stack.pop(); //get rid of opening parenth
                break; //exit inner loop
              } else {
                if (k === 0) {
                  console.error(
                    `Invalid Syntax - No opening parenthesis found`
                  );
                  return;
                }
                tempVal = stack.pop();
                result += ' ' + tempVal;
              }
            }
            continue;
          } else {
            //Is currentEl higher precedence than top of the stack?
            for (let l = stack.length - 1; l > 0; l--) {
              if (isHigherPrecedence(currentEl, stack[stack.length - 1])) {
                stack.push(currentEl);
                break; //exit inner loop
              } else {
                tempVal = stack.pop();
                result += ' ' + tempVal;
                if (l === 0) {
                  result += ' ' + currentEl;
                }
              }
            }
          }
        }
      }
    }
    console.log(`CI Result: ${result}`);
  }

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
