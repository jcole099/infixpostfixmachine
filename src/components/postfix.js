import displayError from './displayerror';

/////////////////////////////////////////////
//calculatePostfix
//
// Calculates/converts a Postfix expression.
// First parameter is an array of data to be converted (numbers and operators)
// Second parameter is boolean, true = calculate | false = convert
//
function calculatePostfix(dataArray, calculate) {
  let previousIndex = -1;
  let alphaIndex = -1;
  let subIndex;

  //used to implement 5a, 5b, 5c, etc indexes
  function checkIndex(index) {
    if (previousIndex === index) {
      //second time it is used
      alphaIndex++;
      subIndex = String.fromCharCode(97 + alphaIndex);
      return subIndex;
    } else {
      //first time index is used
      previousIndex = index;
      alphaIndex = -1;
      return;
    }
  };
  
  
  let stack = [];
  let topEl;
  let bottomEl;
  let calcNumResult;
  let conversionString;
  let resultArray = [];
  let tempStack = [];
  let stackHeight = 3;

  let yellowVal;

  for (let i = 0; i < dataArray.length; i++) {
    let currentEl = dataArray[i];
    //if its a number
    if (!isNaN(dataArray[i])) {
      
      //FIXME: TESTING
      //for creating the yellow value on the stack, must come before stack.push()
      yellowVal = currentEl + 'y';
      tempStack = [...stack];
      tempStack.push(yellowVal);
      //Number
      stack.push(dataArray[i]);
      //TODO: STEP
      if (stack.length > stackHeight) stackHeight = stack.length;
      resultArray.push({
        userData: dataArray,
        curIndex: i,
        displayStackElements: tempStack,
        displayStackHeight: stackHeight,
        action: ['push', dataArray[i]],
        descriptionTextKey: `The current element in the formula is an operand, therefore we push it to the stack.`,
        subIndex: checkIndex(i)
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
            subIndex: checkIndex(i)
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

      //for creating the yellow box on the stack, must come AFTER stack.pop()
      yellowVal = 'yBox';
      tempStack = [...stack];
      tempStack.push(yellowVal);
      tempStack.push(yellowVal);

      //TODO: STEP - POP TOP TWO OPERANDS
      if (stack.length > stackHeight) stackHeight = stack.length;
      resultArray.push({
        userData: dataArray,
        curIndex: i,
        displayStackElements: tempStack,
        displayStackHeight: stackHeight,
        action: ['popTwo', bottomEl, topEl, dataArray[i]],
        descriptionTextKey: `The current element is an operator, therefore we pop the top two operands off of the stack.`,
        subIndex: checkIndex(i)
      });


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


        //TODO: STEP - CALCULATE TWO OPERANDS
        tempStack = [...stack]; //deep copies stack
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['calcTwo', bottomEl, topEl, dataArray[i]],
          descriptionTextKey: `Place the current element (operator) between the two operands popped from the stack in the previous sub step. Calculate the expression (top element goes to the right of the operator).`,
          subIndex: checkIndex(i),
          loop: true
        });
        
        
        calcNumResult = calcNumResult.toFixed(3); //fix for JS floating point rounding
        calcNumResult = parseFloat(calcNumResult);


        //for creating the yellow value on the stack, must come before stack.push()
        yellowVal = calcNumResult + 'y';
        tempStack = [...stack];
        tempStack.push(yellowVal);

        stack.push(calcNumResult);

        //TODO: STEP - PUSH Calculation
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['calcPush', calcNumResult],
          descriptionTextKey: `Since the current element is an operator, we have popped two operands off of the stack, performed a calculation and we are now pushing the result of that calculation to the stack.`,
          subIndex: checkIndex(i),
          loop: true
        });


      } else {
        //TODO: STEP - CONCAT TWO OPERANDS
        //Pushing a string to the stack (convert postfix 2 infix)

        tempStack = [...stack]; //deep copies stack
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['concatTwo', bottomEl, currentEl, topEl], //FIXME: list element and operator
          descriptionTextKey: `Place the current element (operator) between the two operands popped from the stack in the previous sub step (top element goes to the right of the operator).`,
          subIndex: checkIndex(i),
          loop: true
        });

        //TODO: STEP - Push Expression
        //Pushing a string to the stack (convert postfix 2 infix)
        //for creating the yellow value on the stack, must come before stack.push()
        yellowVal = conversionString + 'y';
        tempStack = [...stack];
        tempStack.push(yellowVal);


        stack.push(conversionString);
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['conpush', conversionString],
          descriptionTextKey: `The current element is an operator, therefore we pop the top two elements off of the stack (top element goes to the right). We place the operator inbetween the operands. We also place parentheses around the expression. We push the resulting expression to the stack.`,
          subIndex: checkIndex(i),
          loop: true
        });
      }

      //Last iteration - Print result
      if (i === dataArray.length - 1) {
        //VALIDATION
        //FIXME: 
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
            resultArray.push({
              userData: dataArray,
              curIndex: i + 1,
              displayStackElements: tempStack,
              displayStackHeight: stackHeight,
              action: ['sol', stack[0]],
              descriptionTextKey: `The final element in the formula has been processed, therefore the remaining element on the stack is the solution. In our result we remove the outer parentheses for easier readability.`
            });
          } else {
            resultArray.push({
              userData: dataArray,
              curIndex: i + 1,
              displayStackElements: tempStack,
              displayStackHeight: stackHeight,
              action: ['sol', stack[0]],
              descriptionTextKey: `The final element in the formula has been processed, therefore the remaining element on the stack is the solution.`
            });
          }

          //console.log(`CP Result: ${stack[0]}`);
        }
      }
    }
  }
  console.log(resultArray);
  return [resultArray, stackHeight];
}

export default calculatePostfix;
