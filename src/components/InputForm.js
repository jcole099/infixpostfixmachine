function InputForm({
  setUserInput,
  startProcess,
  checkEnter,
  btnLabel,
  cssGrow,
}) {
  function clearText() {
    document.getElementById('userInput').value = '';
    document.getElementById('idSteps').style.height = '0px';
    document.getElementById('idSteps').style.display = 'none';
    document.getElementById('idSteps').style.paddingBottom = '0px';
  }

  return (
    <div className="inputForm">
      <input
        type="text"
        id="userInput"
        size="70"
        onChange={(e) => setUserInput(e.target.value + ' ')}
        onKeyPress={checkEnter}
      ></input>
      <br></br>
      <input
        type="button"
        value={btnLabel}
        onClick={() => {
          startProcess();
        }}
        className="convertCalcBtn"
      ></input>
      <input type="button" value="Clear" onClick={clearText}></input>
      <br></br>
      <br></br>
    </div>
  );
}

export default InputForm;
