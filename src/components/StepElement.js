import ChildElement from './ChildElement';

function StepElement({
  userData,
  curIndex,
  displayStackElements,
  curSolution,
  displayStackHeight,
  displayTextKey,
}) {
  // return (
  //   <div className="StepElement">
  //     <div>
  //       <h3>Step 1:</h3>
  //     </div>
  //     <div className="ChildElement"></div>
  //     <div className="textInformation">
  //       <div className="arrowIndexContainer">ARROW</div>
  //       <div className="userDataContainer">USER DATA</div>
  //       <div className="actionsContainer">ACTIONS CONTAINER</div>
  //       <div className="actionDescriptionContainer">ACTIONS DESCRIPTION</div>
  //       <div className="currentSolutionContainer">CURRENT SOLUTION</div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="StepElement">
      <div>
        <h3>Step {curIndex}:</h3>
      </div>
      <div className="childOuter">
        <ChildElement />
        <span>
          <i>Stack</i>
        </span>
      </div>

      <div className="textInformation">
        <div className="arrowIndexContainer"></div>
        <div className="userDataContainer"></div>
        <div className="actionsContainer"></div>
        <div className="actionDescriptionContainer"></div>
        <div className="currentSolutionContainer"></div>
      </div>
    </div>
  );
}

export default StepElement;

//POSTFIX CALC
// 1 - "The current element in the formula is an operand, therefore we push it to the stack"
// 2 - "The current element is an operator, therefore we pop the top two operands off of the stack (top operand goes to the right). The operator is placed inbetween the operands and the expression is solved. The solved expression is pushed to the stack."
