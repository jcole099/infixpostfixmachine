import StepElement from './StepElement';
//TODO: pass an array of objects to this class, pass #5 stack height seperately
function Steps({ steps, stackHeight }) {
  return (
    // <div className="steps1" id="idSteps"> //FIXME: tab issue has something todo with id: idSteps
    <div className="steps1" id="idSteps">
      {steps.map((step, i) => (
        <StepElement step={step} stackHeight={stackHeight} key={i} />
      ))}
    </div>
  );
}

export default Steps;
