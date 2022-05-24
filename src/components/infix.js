import displayError from './displayerror';
import {
  hasConsecutiveOperators,
  hasConsecutiveNumbers,
  isAttemptingImpliedMultiplication,
  isHigherPrecedence,
} from './validation';

function convertInfixFunc(dataArray) {

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
  let result = '';
  let tempVal;
  let hasOpeningParenthesis = false;
  

  //results array specific
  let resultArray = [];
  let tempStack = [];
  let stackHeight = 3;
  let yellowVal;

  //EARLY VALIDATION
  if (hasConsecutiveOperators(dataArray)) {
    displayError('Invalid Syntax - cannot have multiple consecutive operators');
    return;
  }

  if (hasConsecutiveNumbers(dataArray)) {
    displayError('Invalid Syntax - cannot have multiple consecutive numbers');
    return;
  }

  if (isAttemptingImpliedMultiplication(dataArray)) {
    displayError(
      'Invalid Syntax - must explicitly include multiplication symbol'
    );
    return;
  }

  //CONVERSION
  for (let i = 0; i < dataArray.length; i++) {
    let currentEl = dataArray[i];

    //End of input?
    if (i === dataArray.length - 1) {
      //Validation check #2
      if (isNaN(currentEl) && currentEl !== ')') {
        displayError(
          'Invalid Syntax - cannot have operator at the end of the input (for Infix)'
        );
        return;
      } else if (currentEl === ')' && stack.length > 0) {
        //handle case where closing parenth at end
        //dump stack to result (excluding first element which is an opening parenth)
        //STEP TODO: CLOSING PARENTHESIS (AT END)
        tempStack = [...stack];
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['closingParenth'], 
          descriptionTextKey: `The final element is a closing parenthesis which we discard. We then begin looping through the stack popping each element to the solution - with the exception of the opening parenthesis, which we also discard.`,
          currentSolution: result,
          subIndex: checkIndex(i),
          infix: true
        });
        while (stack.length > 0) {
          tempVal = stack.pop();
          if (tempVal !== '(') {
            //for creating the yellow box on the stack, must come AFTER stack.pop()
            yellowVal = 'yBox';
            tempStack = [...stack];
            tempStack.push(yellowVal);
            
            //STEP TODO: FINAL EL -> LOOP THROUGH STACK, PLACING OPERANDS AT END OF RESULT 
            tempStack = [...stack];
            if (stack.length > stackHeight) stackHeight = stack.length;
            resultArray.push({
              userData: dataArray,
              curIndex: i,
              displayStackElements: tempStack,
              displayStackHeight: stackHeight,
              action: ['operandToResult', tempVal], //tempVal should be current element
              descriptionTextKey: `We have reached the final element in the formula, therefore we pop each operator off of the stack and on to the solution, in order.`,
              currentSolution: [result, tempVal],
              loop: true,
              subIndex: checkIndex(i),
              infix: true
            });
            result += ' ' + tempVal; 
          }
          if (tempVal === '(' && hasOpeningParenthesis) {
            displayError(
              `Invalid Syntax - parenthesis imbalance (too many opening parentheses)`
            );
            return;
          }
          if (tempVal === '(') {
            //for creating the yellow box on the stack, must come AFTER stack.pop()
            yellowVal = 'yBox';
            tempStack = [...stack];
            tempStack.push(yellowVal);

            hasOpeningParenthesis = true;
            //STEP TODO: OPENING PARENTH DURING FINAL STACK PURGE 
            tempStack = [...stack];
            if (stack.length > stackHeight) stackHeight = stack.length;
            resultArray.push({
              userData: dataArray,
              curIndex: i,
              displayStackElements: tempStack,
              displayStackHeight: stackHeight,
              action: ['openingParenthFinal'], 
              descriptionTextKey: `An opening parenthesis has been encountered on the stack. Typically we would exit the stack loop here but since we are on the final element of the formula we will keep popping the stack to the solution.`,
              currentSolution: result,
              loop: true,
              subIndex: checkIndex(i),
              infix: true
            });
          }
        }
        if (!hasOpeningParenthesis) {
          displayError(
            `Invalid Syntax - parenthesis imbalance (too many closing parentheses)`
          );
          return;
        }
      } else if (currentEl === ')' && stack.length === 0) {
        displayError(
          `Invalid Syntax - parenthesis imbalance (too many closing parentheses)`
        );
        return;
      } else {
        //number
        //put operands in result


        
        //STEP TODO: CURRENT EL IS A NUMBER, PUSH TO STACK FIXME: final operand in formula
        tempStack = [...stack];
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['operandToResult', currentEl], //currentEl should be currentEl...
          descriptionTextKey: `The final element in the formula is an operand, therefore we move the operand to the solution and enter a loop to pop the remaining items from the stack to the solution, in order.`,
          currentSolution: [result, currentEl],
          subIndex: checkIndex(i),
          infix: true
        });
        result += ' ' + currentEl;

        //dump stack to result
        while (stack.length > 0) {
          if (stack[stack.length - 1] === '(') {
            displayError(
              `Invalid Syntax - parenthesis imbalance (too many opening parentheses)`
            );
            return;
          } else {
            tempVal = stack.pop();
            //for creating the yellow box on the stack, must come AFTER stack.pop()
            yellowVal = 'yBox';
            tempStack = [...stack];
            tempStack.push(yellowVal);

            
            //STEP TODO: END PROCESS - DUMPING STACK TO SOLUTION FIXME:

            if (stack.length > stackHeight) stackHeight = stack.length;
            resultArray.push({
              userData: dataArray,
              curIndex: i,
              displayStackElements: tempStack,
              displayStackHeight: stackHeight,
              action: ['operatorFromStackToResult', tempVal], //currentEl should be currentEl...
              descriptionTextKey: `An operator has been encountered on the stack, therefore we move the operator to the solution and continue iterating through the stack until the stack is empty.`,
              currentSolution: [result, tempVal],
              loop: true,
              subIndex: checkIndex(i),
              infix: true
            });
            result += ' ' + tempVal;
          }
        }
      }

      break;
    }

    //Is an operand?
    if (!isNaN(currentEl)) {
      
      //STEP TODO: CURRENT EL IS AN OPERAND, ADD TO SOLUTION
      tempStack = [...stack];
      if (stack.length > stackHeight) stackHeight = stack.length;
      resultArray.push({
        userData: dataArray,
        curIndex: i,
        displayStackElements: tempStack,
        displayStackHeight: stackHeight,
        action: ['operandToResult', currentEl], //currentEl should be currentEl...
        descriptionTextKey: `The current element is an operand, therefore we move the operand to the solution.`,
        currentSolution: [result, currentEl],
        subIndex: checkIndex(i),
        infix: true
      });
      result += ' ' + currentEl;
      continue;
    } else {
      //Is it an opening parenth?
      if (currentEl === '(') {
        //for creating the yellow value on the stack, must come before stack.push()
        yellowVal = currentEl + 'y';
        tempStack = [...stack];
        tempStack.push(yellowVal);

        stack.push(currentEl);
        //STEP TODO: OPENING PARENTH, PUSH TO STACK
        
        if (stack.length > stackHeight) stackHeight = stack.length;
        resultArray.push({
          userData: dataArray,
          curIndex: i,
          displayStackElements: tempStack,
          displayStackHeight: stackHeight,
          action: ['pushOpenParenth', '('],
          descriptionTextKey: `The current element is an opening parenthesis, therefore we push it to the stack.`, 
          currentSolution: result,
          subIndex: checkIndex(i),
          infix: true
        });
        continue;
      } else {
        if (currentEl === ')') {
          //validation
          if (currentEl === ')' && stack.length === 0) {
            displayError(
              `Invalid Syntax - parenthesis imbalance (too many closing parentheses)`
            );
            return;
          }
          //STEP TODO: CLOSING PARENTHESIS FOUND - ENTER OPENING PARENTHESIS LOOP
          tempStack = [...stack];
          if (stack.length > stackHeight) stackHeight = stack.length;
          resultArray.push({
            userData: dataArray,
            curIndex: i,
            displayStackElements: tempStack,
            displayStackHeight: stackHeight,
            action: ['closingParenth'],
            descriptionTextKey: `The current element is a closing parenthesis. The closing parenthesis is discarded and we loop through the stack - popping each element to the solution until an opening parenthesis is located.`,
            currentSolution: result,
            subIndex: checkIndex(i),
            infix: true
          });
          //loop through stack looking for opening parenth
          for (let k = stack.length - 1; k >= 0; k--) {
            if (stack[k] === '(') {
              
              stack.pop(); //get rid of opening parenth
              //for creating the yellow box on the stack, must come AFTER stack.pop()
              yellowVal = 'yBox';
              tempStack = [...stack];
              tempStack.push(yellowVal);

              //STEP TODO: LOOPING THROUGH STACk, FOUND OPENING PARENTHESIS
              if (stack.length > stackHeight) stackHeight = stack.length;
              resultArray.push({
                userData: dataArray,
                curIndex: i,
                displayStackElements: tempStack,
                displayStackHeight: stackHeight,
                action: ['removeOpenParenthStack'],
                descriptionTextKey: `An opening parenthesis has been encountered on the stack, therefore we pop the parenthesis from the stack, discard it, and exit the parenthesis checking loop.`,
                currentSolution: result,
                loop: true,
                subIndex: checkIndex(i),
                infix: true
              });

              break; //exit inner loop
            } else {
              if (k === 0) {
                displayError(`Invalid Syntax - No opening parenthesis found`);
                return;
              }
              //FIXME: SAVE tempVal location on the stack
              
              tempVal = stack.pop();

              //for creating the yellow box on the stack, must come AFTER stack.pop()
              yellowVal = 'yBox';
              tempStack = [...stack];
              tempStack.push(yellowVal);
              
              
              //STEP TODO: LOOPING THROUGH STACK, FOUND OPERAND

              if (stack.length > stackHeight) stackHeight = stack.length;
              resultArray.push({
                userData: dataArray,
                curIndex: i,
                displayStackElements: tempStack,
                displayStackHeight: stackHeight,
                action: ['operatorFromStackToResult', tempVal], //tempVal should be current element
                descriptionTextKey: `An operator has been encountered on the stack, therefore we pop the operator off of the stack, move it to the solution, and continue iterating through the stack until an opening parenthesis is found.`,
                currentSolution: [result, tempVal], //FIXME:
                loop: true,
                subIndex: checkIndex(i),
                infix: true
              });
              result += ' ' + tempVal;
            }
          }
          continue;
        } else {
          //edge case where stack has no length
          if (stack.length === 0) {
            //for creating the yellow value on the stack, must come before stack.push()
            yellowVal = currentEl + 'y';
            tempStack = [...stack];
            tempStack.push(yellowVal);

            stack.push(currentEl);
            //STEP TODO: OPERATOR, STACK NO LENGTH -> PUSH TO STACK
            if (stack.length > stackHeight) stackHeight = stack.length;
            resultArray.push({
              userData: dataArray,
              curIndex: i,
              displayStackElements: tempStack,
              displayStackHeight: stackHeight,
              action: ['operatorToStack', currentEl], //currentEl should be current operator
              descriptionTextKey: `The current element is an operator. Since the stack is empty, there are no other operators to compare the current operator's precendence against. Therefore, the current operator automatically gets pushed to the stack.`,
              currentSolution: result,
              subIndex: checkIndex(i),
              infix: true
            });
            continue; //next outer loop
          }

          tempStack = [...stack];
          if (stack.length > stackHeight) stackHeight = stack.length;
          resultArray.push({
            userData: dataArray,
            curIndex: i,
            displayStackElements: tempStack,
            displayStackHeight: stackHeight,
            action: ['operatorCheckPrecedence', currentEl], //currentEl should be currentEl...
            descriptionTextKey: `The current element is an operator, therefore its precedence is compared against the precedence of the operator at the top of the stack. We enter a precedence checking loop.`,
            currentSolution: result,
            subIndex: checkIndex(i),
            infix: true
          });
          //Is currentEl higher precedence than top of the stack?
          for (let l = stack.length - 1; l >= 0; l--) {
            //STEP TODO: Compare current element to stack FIXME:
            
            
            
            if (isHigherPrecedence(currentEl, stack[stack.length - 1])) {
              //YES - current el higher precedence than top of stack
              //for creating the yellow value on the stack, must come before stack.push()
              yellowVal = currentEl + 'y';
              tempStack = [...stack];
              tempStack.push(yellowVal);
              
              stack.push(currentEl);
              //STEP TODO: OPERATOR TO STACK, INNER PRECEDENCE LOOP
              if (stack.length > stackHeight) stackHeight = stack.length;
              resultArray.push({
                userData: dataArray,
                curIndex: i,
                displayStackElements: tempStack,
                displayStackHeight: stackHeight,
                action: ['operatorToStack', currentEl], //currentEl should be current operator
                descriptionTextKey: `The current element is an operator and has a HIGHER precedence than the top of the stack. Therefore the current element is pushed to the stack. We exit the inner precedence checking loop.`,
                currentSolution: result,
                subIndex: checkIndex(i),
                loop: true,
                infix: true
              });
              break; //exit inner loop
            } else {
              //NO - current el is not higher precedence than top of stack
              tempVal = stack.pop();
              //for creating the yellow box on the stack, must come AFTER stack.pop()
              yellowVal = 'yBox';
              tempStack = [...stack];
              tempStack.push(yellowVal);
              
              //STEP TODO: OPERATOR FROM STACK TO SOLUTION - INNER PRECEDENCE LOOP
              if (stack.length > stackHeight) stackHeight = stack.length;
              resultArray.push({
                userData: dataArray,
                curIndex: i,
                displayStackElements: tempStack,
                displayStackHeight: stackHeight,
                action: ['operatorFromStackToResult', tempVal], //currentEl should be currentEl...
                descriptionTextKey: `The current element is an operator and has a LOWER precedence than the top of the stack. Therefore the top of the stack is popped off and moved to the solution. We continue comparing the current element's precedence with the top of the stack...`,
                currentSolution: [result, tempVal],
                loop: true,
                subIndex: checkIndex(i),
                infix: true
              });
              result += ' ' + tempVal;
              if (l === 0) {
                //STEP TODO: OPERATOR TO STACK - LAST ELEMENT ON STACK (either empty of current el has lowest precedence)
                //FIXME:
                
                //for creating the yellow value on the stack, must come before stack.push()
                yellowVal = currentEl + 'y';
                tempStack = [...stack];
                tempStack.push(yellowVal);

                stack.push(currentEl);



                if (stack.length > stackHeight) stackHeight = stack.length;
                resultArray.push({
                  userData: dataArray,
                  curIndex: i,
                  displayStackElements: tempStack,
                  displayStackHeight: stackHeight,
                  action: ['operatorToStack', currentEl], //currentEl should be currentEl...
                  descriptionTextKey: `We have reached the end of the stack and there are no other operators to compare the current element to, therefore we push the current element to the stack and exit the inner precedence checking loop.`,
                  currentSolution: result,
                  loop: true,
                  subIndex: checkIndex(i),
                  infix: true
                });
              }
            }
          }
        }
      }
    }
  }
  console.log(resultArray);
  return [resultArray, stackHeight];
}

export default convertInfixFunc;
