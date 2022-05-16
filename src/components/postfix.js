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
  let conversionString;
  let resultArray = [];
  let tempStack = [];
  let stackHeight = 3;
  let calcString = '';

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
            `Invalid Postfix syntax. Please check syntax - Multiple items on stack at end of process`
          );
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
        displayError(
          `Invalid Postfix syntax. Please check syntax - Too many operators or too few operands`
        );
        return false;
      }

      if (i === dataArray.length - 1) {
        //VALIDATION
        if (!isNaN(dataArray[i])) {
          displayError(
            `Invalid Postfix syntax. Please check syntax - Last element must be operator`
          );
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

        calcNumResult = calcNumResult.toFixed(3); //fix for JS floating point rounding
        calcNumResult = parseFloat(calcNumResult);
        stack.push(calcNumResult);
        //TODO: STEP
        tempStack = [...stack]; //deep copies stack
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
        //Pushing a string to the stack (convert postfix 2 infix)
        stack.push(conversionString);
        tempStack = [...stack]; //deep copies stack
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['conpush', conversionString],
          descriptionTextKey: 4,
        });
      }

      //Last iteration - Print result
      if (i === dataArray.length - 1) {
        //VALIDATION
        if (stack.length > 1) {
          displayError(
            `Invalid Postfix syntax. Please check syntax - Multiple items on stack at end of process`
          );
          return false;
        } else {
          //TODO: STEP
          //RESULTS
          tempStack = [...stack];
          if (stack.length > stackHeight) stackHeight = stack.length;

          //remove outer parenthesis if it is a convert function (improves readability)
          let tempString = stack[0];
          if (!calculate) {
            stack[0] = tempString.slice(1, tempString.length - 1);
          }

          resultArray.push({
            userData: dataArray,
            curIndex: i + 1,
            displayStackElements: tempStack,
            displayStackHeight: stackHeight,
            action: ['sol', stack[0]],
            descriptionTextKey: 5,
          });
          //console.log(`CP Result: ${stack[0]}`);
        }
      }
    }
  }
  console.log(resultArray);
  return [resultArray, stackHeight];
}

export default calculatePostfix;
