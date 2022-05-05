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
  let resultArray = [];
  let tempStack = [];
  let stackHeight = 3;

  for (let i = 0; i < dataArray.length; i++) {
    //if its a number
    if (!isNaN(dataArray[i])) {
      //Number
      stack.push(dataArray[i]);
      //TODO: STEP
      tempStack = [...stack];
      if (stack.length > stackHeight) stackHeight = stack.length;
      resultArray.push({
        userData: dataArray,
        curIndex: i,
        displayStackElements: tempStack,
        displayStackHeight: stackHeight,
        action: ['push', dataArray[i]],
        descriptionTextKey: 1,
      });
      if (i === dataArray.length - 1) {
        //VALIDATION
        if (stack.length > 1) {
          displayError(
            `Invalid Postfix syntax - Multiple items on stack at end of process`
          );
          displayError(`CP STACK: ${stack}`);
          return false;
        } else {
          //TODO: STEP
          //RESULTS
          tempStack = [...stack];
          if (stack.length > stackHeight) stackHeight = stack.length;
          resultArray.push({
            userData: dataArray,
            curIndex: i + 1,
            displayStackElements: tempStack,
            displayStackHeight: stackHeight,
            action: ['sol', stack[0]],
            descriptionTextKey: 3,
          });
          //console.log(`CP Result: ${stack[0]}`);
        }
      }
      continue;
    } else {
      //Operand

      //VALIDATION - Verify that there are two elements on stack
      if (stack.length < 2) {
        displayError(`Invalid Postfix syntax - Need two elements on Stack`);
        displayError(`CP STACK: ${stack}`);
        return false;
      }

      if (i === dataArray.length - 1) {
        //VALIDATION
        if (!isNaN(dataArray[i])) {
          displayError(
            `Invalid Postfix syntax - Last element must be operator`
          );
          displayError(`CP STACK: ${stack}`);
          return false;
        }
      }

      //CALCULATION
      topEl = stack.pop();
      bottomEl = stack.pop();

      if (calculate) {
        calcString = bottomEl + ' ' + dataArray[i] + ' ' + topEl;
        //console.log(`CP Calculation String: ${calcString}`); //TESTING
      } else {
        conversionString =
          '(' + bottomEl + ' ' + dataArray[i] + ' ' + topEl + ')';
        //console.log(`CP Conversion String: ${conversionString}`); //TESTING
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

        calcNumResult = calcNumResult.toFixed(3); //TODO: fix for JS floating point rounding
        calcNumResult = parseFloat(calcNumResult);
        stack.push(calcNumResult);
        //TODO: STEP
        tempStack = [...stack];
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['calc', bottomEl, topEl, dataArray[i]],
          descriptionTextKey: 2,
        });
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
          return false;
        } else {
          //TODO: STEP
          //RESULTS
          tempStack = [...stack];
          if (stack.length > stackHeight) stackHeight = stack.length;
          resultArray.push({
            userData: dataArray,
            curIndex: i + 1,
            displayStackElements: tempStack,
            displayStackHeight: stackHeight,
            action: ['sol', stack[0]],
            descriptionTextKey: 3,
          });
          //console.log(`CP Result: ${stack[0]}`);
        }
      }
    }
  }
  console.log(resultArray);
  console.log(`stiznack height: ${stackHeight}`);
  return [resultArray, stackHeight];
}

export default calculatePostfix;
