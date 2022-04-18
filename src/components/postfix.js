import displayError from './displayerror';

/////////////////////////////////////////////
//calculatePostfix
//
// Calculates/converts a Postfix expression.
// First parameter is an array of data to be converted (numbers and operators)
// Second parameter is boolean, true = calculate | false = convert
//
function calculatePostfix(dataArray, calculate) {
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
          displayError(
            `Invalid Postfix syntax - Multiple items on stack at end of process`
          );
          displayError(`CP STACK: ${stack}`);
        } else {
          console.log(`CP Result: ${stack[0]}`);
        }
      }
      continue;
    } else {
      //Operand

      //VALIDATION - Verify that there are two elements on stack
      if (stack.length < 2) {
        displayError(`Invalid Postfix syntax - Need two elements on Stack`);
        displayError(`CP STACK: ${stack}`);
      }

      if (i === dataArray.length - 1) {
        //VALIDATION
        if (!isNaN(dataArray[i])) {
          displayError(
            `Invalid Postfix syntax - Last element must be operator`
          );
          displayError(`CP STACK: ${stack}`);
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
          displayError(
            `Invalid Postfix syntax - Multiple items on stack at end of process`
          );
          displayError(`CP STACK: ${stack}`);
        } else {
          console.log(`CP Result: ${stack[0]}`);
        }
      }
    }
  }
}

export default calculatePostfix;
