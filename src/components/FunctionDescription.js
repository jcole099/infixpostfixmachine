function FunctionDescription({ subtitle, allowedOperators, allowedNumbers }) {
  return (
    <div>
      <h1>{subtitle}</h1>
      <h3>Allowed Inputs</h3>
      <span>Operators: {allowedOperators}</span>
      <br></br>
      <span>Numbers: {allowedNumbers}</span>
    </div>
  );
}

export default FunctionDescription;
