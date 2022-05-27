import ChildElement from './ChildElement';
import StepIndexElement from './StepIndexElement';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { ImLoop2 } from 'react-icons/im';




function StepElement({ step, stackHeight }) {
  let columns = step.userData.map((el, i) => {
    if (i === step.curIndex) {
      if (step.loop === true) {
        //in iterating loop
        return (
          <StepIndexElement
              el={el}
              arrow={<ImLoop2 className="loopArrow" />}
              key={i}
            />
        );
      } else {
        return (
          <StepIndexElement
            el={el}
            arrow={<FaLongArrowAltDown className="downArrow" />}
            key={i}
          />
        );
      }
    } else {
      return <StepIndexElement el={el} arrow={null} key={i} />;
    }
  });

  let actionText = '';
  function actions() {
    if (step.action[0] === 'push') {
      actionText = `Push ${step.action[1]} to stack`;
    } else if (step.action[0] === 'calcPush') {
      actionText = `Push the result of the calculation (${step.action[1]}) to the stack.`;
    } else if (step.action[0] === 'sol') {
      actionText = `Final result: ${step.action[1]}`;
    } else if (step.action[0] === 'conpush') {
      actionText = `Push ${step.action[1]} to stack`;
    } else if (step.action[0] === 'pushOpenParenth') {
      actionText = `Push  ${step.action[1]}  to stack`;
    } else if (step.action[0] === 'removeOpenParenthStack') {
      actionText = `Pop ( from the stack, exit stack loop`;
    } else if (step.action[0] === 'operandToResult') {
      actionText = `Move ${step.action[1]} to the end of the result`;
    } else if (step.action[0] === 'operatorFromStackToResult') {
      actionText = `Pop ${step.action[1]} from the stack, move to the end of the result`;
    } else if (step.action[0] === 'operatorToStack') {
      actionText = `Push ${step.action[1]} to stack`;
    } else if (step.action[0] === 'closingParenth') {
      actionText =  `Discard ) and enter stack loop`;
    } else if (step.action[0] === 'openingParenthFinal') {
      actionText =  `Discard ( and keep iterating through stack`;
    } else if (step.action[0] === 'operatorCheckPrecedence') {
      actionText =  `Compare ${step.action[1]} with stack precedence, enter precedence checking loop`;
    } else if (step.action[0] === 'popTwo') {
      actionText =  `Pop the top two operands "${step.action[1]}" & "${step.action[2]}" from the stack`;
    } else if (step.action[0] === 'calcTwo') {
      actionText =  `Calculate the expression ${step.action[1]} ${step.action[3]} ${step.action[2]}`;
    } else if (step.action[0] === 'concatTwo') {
      actionText =  `Concatenate elements "${step.action[1]}", "${step.action[2]}", and "${step.action[3]}" to form an expression`;
    }
  }
  actions();

  function hasSolutionComponent() {
    //if step has an attribute currentSolution with a value....
    if (step.currentSolution) {
      if (typeof(step.currentSolution) === 'object') {
        return (
          <div className='solutionMaster'>
            <div className="solutionPast">Current Solution: {step.currentSolution[0]}</div>
            <div className="solutionUpdate">{step.currentSolution[1]}</div>
          </div>
        );
      } else {
        return (
          <div className="solutionPast">Current Solution: {step.currentSolution}</div>
        );
      }
    } else if (step.infix) {
      return  <div className="solutionPast">Current Solution: </div>
    }
  }

  function prepareIndex() {
    if (step.subIndex !== undefined) {
      let index = step.curIndex + 1;
      let displayIndex = index + step.subIndex;
      return displayIndex;
    } else {
      return step.curIndex + 1 ;
    }
  };

  return (
    
    <div className="StepElement">
      <div className="stepNum">
        <h3>Step {prepareIndex()}:</h3>
      </div>

      <div className="childOuter">
        <ChildElement
          displayStackElements={step.displayStackElements}
          displayStackHeight={stackHeight}
        />
        <div className='stackText'>
          <span>
            <i>Stack</i>
          </span>
        </div>
      </div>

      <div className="textInformation">
        <div className="indexContainer">{columns}</div>
        <div className="actionsContainer">{actionText}</div>
        <div className="actionDescriptionContainer">
          <p>{step.descriptionTextKey}</p>
        </div>
        {hasSolutionComponent()}
      </div>
    </div>
  );
}

export default StepElement;
