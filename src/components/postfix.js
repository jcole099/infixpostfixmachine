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
        descriptionTextKey: `The current element in the formula is an operand, therefore we push it to the stack.`,
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
            descriptionTextKey: `The final element in the formula has been processed, therefore the remaining element on the stack is the solution.`,
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

      if (!calculate) {
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
          descriptionTextKey: `The current element is an operator, therefore we pop the top two operands off of the stack (top operand goes to the right). The operator is placed inbetween the operands and the expression is solved. The solved expression is pushed to the stack.`,
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
          descriptionTextKey: `The current element is an operator, therefore we pop the top two elements off of the stack (top element goes to the right). We place the operator inbetween the operands. We also place parentheses around the expression. We push the resulting expression to the stack.`,
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
            descriptionTextKey: `The final element in the formula has been processed, therefore the remaining element on the stack is the solution. In our result we remove the outer parentheses for easier readability.`,
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
