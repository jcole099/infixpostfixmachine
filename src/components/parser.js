import displayError from './displayerror';
import { isPar, isNumber, isOperator, isValidNonNum } from './validation';

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

  for (let char of userInput) {
    if (isPar(char) && !convertInfix) {
      displayError(`Parenthesis are not allowed in this operation`);
      return false;
    }
    if (isNumber(char)) {
      //VALID NUM
      //case with multiple consecutive periods
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
        displayError(`First value cannot be an operator [${char}]`);
        return false;
      }
      //also invalid if prev = null, is parenthesis, is not convertInfix
      if (previousEl === null && isPar(char) && !convertInfix) {
        displayError(`First value cannot be an operator [${char}]`);
        return false;
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
