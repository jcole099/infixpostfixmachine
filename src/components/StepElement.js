import ChildElement from './ChildElement';

function StepElement({
  userData,
  curIndex,
  displayStackElements,
  curSolution,
  displayStackHeight,
  displayTextKey,
}) {
  return (
    <div className="StepElement">
      <div>
        <h4>Step {curIndex}:</h4>
      </div>
      <ChildElement />
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
