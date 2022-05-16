function FunctionDescription({ subtitle, allowedOperators, allowedNumbers }) {
  return (
    <div>
      <h2>{subtitle}</h2>
      <h4>Allowed Inputs:</h4>
      <span>Operators: {allowedOperators}</span>
      <br></br>
      <span>Numbers: {allowedNumbers}</span>
    </div>
  );
}

export default FunctionDescription;
