function InputForm({ setUserInput, startProcess, checkEnter, btnLabel }) {
  function clearText() {
    document.getElementById('userInput').value = '';
  }

  function cssGrow() {
    document.getElementById('idSteps').style.height = '200px';
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
          cssGrow();
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
