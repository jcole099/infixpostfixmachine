import displayError from './displayerror';
import { isPar, isNumber, isOperator, isValidNonNum, isSub } from './validation';

/////////////////////////////////////////////
// parser
//
// Handles converting a string to a data array.
// Checks for basic syntax validation.
// Function specific syntax validation will be deferred to their
// respective functions.

// PARAMS
// First param is the userinput string
// Second param is a boolean, used for validation of parenthesis. Set to true if user is trying to convert Infix -> Postfix
//
function parser(userInput, convertInfix) {
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  let userData = [];
  let previousEl = null;

  if (userInput === '' || userInput === ' ') {
    displayError(`Must include an input to process`);
    return false;
  }
  let char;
  let dataIndex = -1;
  let isNeg = false;
  for (let index in userInput) {
    char = userInput[index];
    if (isPar(char) && !convertInfix) {
      displayError(`Parenthesis are not allowed in this operation`);
      return false;
    }
    if (isNumber(char)) {
      //VALID NUM
      //case with multiple consecutive periods

      //FIXME: only set neg if - is followed by a number
      if (isNeg && isNumber(char)) {
        previousEl = char;
        continue;
      }

      if (previousEl !== null) {
        if (char === '.' && previousEl[previousEl.length - 1] === '.') {
          displayError(
            `Invalid Syntax. Cannot have 2 or more periods next to each other.`
          );
          return false;
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
      
      //FIXME:
      if (!isNaN(userData[dataIndex]) && isOperator(previousEl) && isNumber(char)) {
        isNeg = true;
        previousEl = char;
        continue;
      } 


      //handle case with no spaces - previousEl is operator, char is number
      if (isOperator(previousEl)) {
        userData.push(previousEl);
        dataIndex++;
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

      //FIXME: previousEl is num, current an operator
      if (previousEl !== ' ' && !isNaN(previousEl) && isNeg) {
        userData.push(previousEl * -1);
        dataIndex++;
        previousEl = char;
        if (!isSub(char)) {
          isNeg = false;
        }
        continue;
      }

      //FIXME: 3 consecutive operators
      // if (isNeg && isSub(char)) {
      //   displayError('Too many consecutive operators, at least 3');
      //   return false;
      // }

      //FIXME: previousEl is operator, current El is operator
      // if (isOperator(userData[dataIndex]) && isSub(char)) {
      //   isNeg = true;
      //   previousEl = char;
      //   continue;
      // }

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
      if (previousEl === null && !isPar(char) && !isSub(char)) {
        displayError(`First value cannot be an operator [${char}]`);
        return false;
      }
      //also invalid if prev = null, is parenthesis, is not convertInfix
      if (previousEl === null && isPar(char) && !convertInfix && !isSub(char)) {
        displayError(`First value cannot be an operator [${char}]`);
        return false;
      }
      //handles case where there is no space between number and operator
      if (isOperator(char) && isNumber(previousEl)) {
        userData.push(parseFloat(previousEl));
        dataIndex++;
        previousEl = char;
        continue;
      }
      if (char === ' ') {
        //parenthesis on end of the string
        if (isPar(previousEl)) {
          userData.push(previousEl);
          dataIndex++;
          previousEl = char;
          continue;
        }

        //FIXME: 
        if (parseInt(index) === userInput.length - 1 && isSub(previousEl)) {
          userData.push(previousEl);
          continue;
        }

        //FIXME:
        if (isSub(previousEl)) {
          continue;
        }


        //handle case where previousEl is an operator
        if (isOperator(previousEl)) {
          userData.push(previousEl);
          dataIndex++;
          previousEl = char;
          continue;
        }
        previousEl = parseFloat(previousEl);
        userData.push(previousEl);
        dataIndex++;
        previousEl = char;
        continue;
      } else {
        if (isOperator(char)) {
          if (isPar(char) && isOperator(previousEl)) {
            userData.push(previousEl);
            dataIndex++;
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
            dataIndex++;
            previousEl = char;
            continue;
          }
          //Handles Par and space.
          if (isPar(char)) {
            previousEl === null ? userData.push(char) : (previousEl = char);
            continue;
          }

          //FIXME:
          if (isSub(char) && previousEl === ' ') {
            isNeg = true;
            previousEl = char;
            continue;
          }

          //executes whe char is operator and prev is a space
          if (isOperator(char) && previousEl === ' ') {
            previousEl = char;
            continue;
          }
          if (isOperator(char) && isPar(previousEl)) {
            userData.push(previousEl);
            dataIndex++;
            previousEl = char;
            continue;
          }
          //FIXME: consecutive operators
          if (isOperator(previousEl) && isOperator(char)) {
            userData.push(previousEl);
            dataIndex++;
            if (!isSub(char)) {
              isNeg = false;
            } else {
              isNeg = true;
            }
            previousEl = char;
            continue;
          }



          //FIXME: previousEl = operator, char = sub
          if (isOperator(previousEl) && isSub(char)) {
            userData.push(previousEl);
            dataIndex++;
            previousEl = char;
            isNeg = true;
            continue;
          }

          if (isOperator(char) && isOperator(previousEl)) {
            userData.push(previousEl);
            dataIndex++;
            previousEl = char;
            continue;
          }
          //FIXME: First el is a subtraction
          if (isSub(char)) {
            isNeg = true;
            previousEl = char;
            continue;
          }
          //when previousEl is a multi-digit value and char is an operator
          userData.push(parseFloat(previousEl));
          previousEl = char;
        } else if ((char === '(' || char === ')') && convertInfix) {
          continue;
        } else {
          displayError(`Invalid syntax! [${char}] is an illegal character`);
          return false;
        }
      }
    } else {
      //NOT VALID
      displayError(`Not a valid char! [${char}]`);
      displayError(`No letters allowed`);
      displayError(`No commas allowed`);
      displayError(`Only use the following operators: + - * / ^ ( )`);
      //TODO: Display errors on the GUI
      return false;
    }
  }

  //console.log(`PARSER User Input: ${userInput}`);
  //console.log(`PARSER User Data: ${userData}`);
  return userData;
}

export default parser;
