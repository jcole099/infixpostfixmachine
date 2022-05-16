import ChildElement from './ChildElement';
import StepIndexElement from './StepIndexElement';
import { FaLongArrowAltDown } from 'react-icons/fa';

function StepElement({ step, stackHeight }) {
  let columns = step.userData.map((el, i) => {
    if (i === step.curIndex) {
      return (
        <StepIndexElement
          el={el}
          arrow={<FaLongArrowAltDown className="downArrow" />}
          key={i}
        />
      );
    } else {
      return <StepIndexElement el={el} arrow={null} key={i} />;
    }
  });

  let actionText = '';
  function actions() {
    if (step.action[0] === 'push') {
      actionText = `Push ${step.action[1]} to stack`;
    } else if (step.action[0] === 'calc') {
      actionText = `Calculate ${step.action[1]} ${step.action[3]} ${step.action[2]} and push the result to the stack.`;
    } else if (step.action[0] === 'sol') {
      actionText = `Final result: ${step.action[1]}`;
    }
  }
  actions();

  let actionDescription = '';
  function actionDesc() {
    if (step.descriptionTextKey === 1) {
      actionDescription = `The current element in the formula is an operand, therefore we push it to the stack.`;
    } else if (step.descriptionTextKey === 2) {
      actionDescription = `The current element is an operator, therefore we pop the top two operands off of the stack (top operand goes to the right). The operator is placed inbetween the operands and the expression is solved. The solved expression is pushed to the stack.`;
    } else if (step.descriptionTextKey === 3) {
      actionDescription = `The final element in the formula has been processed, therefore the remaining element on the stack is the solution.`;
    }
  }
  actionDesc();

  return (
    <div className="StepElement">
      <div className="stepNum">
        <h3>Step {step.curIndex + 1}:</h3>
      </div>

      <div className="childOuter">
        <ChildElement
          displayStackElements={step.displayStackElements}
          displayStackHeight={stackHeight}
        />
        <span>
          <i>Stack</i>
        </span>
      </div>

      <div className="textInformation">
        <div className="indexContainer">{columns}</div>
        <div className="actionsContainer">{actionText}</div>
        <div className="actionDescriptionContainer">
          <p>{actionDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default StepElement;
//STEP ATTRIBUTES
// userData,
// curIndex,
// displayStackElements,
// action,
// descriptionTextKey,

//POSTFIX CALC
//Action Key
//['push', number to push to stack] - 'Push $[num] to stack'
//['calc', bottomEl, topEl, operator] - 'Calculate ${bottomEl} ${operator} ${topEl} and push the result to the stack'
//['sol', result] - `Final Result: ${result}`

//Description Key
// 1 - "The current element in the formula is an operand, therefore we push it to the stack"
// 2 - "The current element is an operator, therefore we pop the top two operands off of the stack (top operand goes to the right). The operator is placed inbetween the operands and the expression is solved. The solved expression is pushed to the stack."
// 3 - "The final element in the formula has been processed, therefore the remaining element on the stack is the solution."
