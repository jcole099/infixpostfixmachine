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

function isStrictOperator(char) {
  if (
    char === '+' ||
    char === '-' ||
    char === '*' ||
    char === '/' ||
    char === '^'
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

function hasConsecutiveOperators(dataArray) {
  let operatorDetected = false;

  for (let element of dataArray) {
    if (isStrictOperator(element)) {
      if (operatorDetected) {
        return true;
      } else {
        operatorDetected = true;
      }
    } else {
      operatorDetected = false;
    }
  }
  return false;
}

function hasConsecutiveNumbers(dataArray) {
  let numberDetected = false;

  for (let element of dataArray) {
    if (!isNaN(element)) {
      if (numberDetected) {
        return true;
      } else {
        numberDetected = true;
      }
    } else {
      numberDetected = false;
    }
  }
  return false;
}

function isAttemptingImpliedMultiplication(dataArray) {
  //check for numbers next to parenthesis
  let numPresent = false;
  let parenthPresent = false;
  let closingParenthDetected = false;

  for (let element of dataArray) {
    //checks parenth * parenth
    if (element === ')') {
      closingParenthDetected = true;
    } else if (element === '(' && closingParenthDetected) {
      return true;
    } else {
      closingParenthDetected = false;
    }
    //checks num * parenth
    if (!isNaN(element)) {
      numPresent = true;
    } else if (element === '(' && numPresent) {
      return true;
    } else {
      numPresent = false;
    }
    //check parenth * num
    if (element === ')') {
      parenthPresent = true;
    } else if (!isNaN(element) && parenthPresent) {
      return true;
    } else {
      parenthPresent = false;
    }
  }
  return false;
}

export {
  isNumber,
  isValidNonNum,
  isOperator,
  isStrictOperator,
  isPar,
  isHigherPrecedence,
  hasConsecutiveOperators,
  hasConsecutiveNumbers,
  isAttemptingImpliedMultiplication,
};
