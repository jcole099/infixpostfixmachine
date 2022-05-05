function StepIndexElement({ el, arrow }) {
  return (
    <div className="elCell">
      <div className="arrowDiv">{arrow}</div>
      <div className="elDiv">{el}</div>
    </div>
  );
}

export default StepIndexElement;
