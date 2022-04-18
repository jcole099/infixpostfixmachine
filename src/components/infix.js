import displayError from './displayerror';
import {
  hasConsecutiveOperators,
  hasConsecutiveNumbers,
  isAttemptingImpliedMultiplication,
  isHigherPrecedence,
} from './validation';

function convertInfixFunc(dataArray) {
  let stack = [];
  let result = '';
  let tempVal;
  let hasOpeningParenthesis = false;

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
        while (stack.length > 0) {
          tempVal = stack.pop();
          if (tempVal !== '(') {
            result += ' ' + tempVal;
          }
          if (tempVal === '(' && hasOpeningParenthesis) {
            displayError(
              `Invalid Syntax - parenthesis imbalance (too many opening parentheses)`
            );
            return;
          }
          if (tempVal === '(') {
            hasOpeningParenthesis = true;
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
        result += ' ' + currentEl;

        //dump stack to result
        while (stack.length > 0) {
          if (stack[stack.length - 1] === '(') {
            displayError(
              `Invalid Syntax - parenthesis imbalance (too many opening parentheses)`
            );
            return;
          } else {
            result += ' ' + stack.pop();
          }
        }
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
          //validation
          if (currentEl === ')' && stack.length === 0) {
            displayError(
              `Invalid Syntax - parenthesis imbalance (too many closing parentheses)`
            );
            return;
          }
          //loop through stack looking for opening parenth
          for (let k = stack.length - 1; k >= 0; k--) {
            if (stack[k] === '(') {
              stack.pop(); //get rid of opening parenth
              break; //exit inner loop
            } else {
              if (k === 0) {
                displayError(`Invalid Syntax - No opening parenthesis found`);
                return;
              }
              tempVal = stack.pop();
              result += ' ' + tempVal;
            }
          }
          continue;
        } else {
          //edge case where stack has no length
          if (stack.length === 0) {
            stack.push(currentEl);
            continue; //next outer loop
          }

          //Is currentEl higher precedence than top of the stack?
          for (let l = stack.length - 1; l >= 0; l--) {
            if (isHigherPrecedence(currentEl, stack[stack.length - 1])) {
              stack.push(currentEl);
              break; //exit inner loop
            } else {
              tempVal = stack.pop();
              result += ' ' + tempVal;
              if (l === 0) {
                stack.push(currentEl);
              }
            }
          }
        }
      }
    }
  }
  console.log(`CI Result: ${result}`);
}

export default convertInfixFunc;
