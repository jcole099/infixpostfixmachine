function StackCell({ num }) {
  //attempt to make text yellow for newly added item to stack
  //if num is not {null, undefined} and if it ends with a 'y'
  if (num && num[num.length - 1] === 'y') {
    num = num.slice(0, num.length - 1);
    return (
      <div className="textCell yellow">
        <span>{num}</span>
      </div>
    );
  } else if (num && num === 'yBox') {
    return (
      <div className="textCell">
        <div className="yBox"></div>
      </div>
    );
  } else {
    return (
      <div className="textCell">
        <span>{num}</span>
      </div>
    );
  }
}

export default StackCell;

//USED the following code from infix to implement this:
        //for creating the yellow value on the stack, must come before stack.push()
        // yellowVal = currentEl + 'y';
        // tempStack = [...stack];
        // tempStack.push(yellowVal);

        // stack.push(currentEl);
        //STEP TODO: OPENING PARENTH, PUSH TO STACK