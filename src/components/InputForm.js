function InputForm({ setUserInput, startProcess, checkEnter, btnLabel }) {
  function clearText() {
    document.getElementById('userInput').value = '';
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
      <input type="button" value={btnLabel} onClick={startProcess}></input>
      <input type="button" value="Clear" onClick={clearText}></input>
      <br></br>
      <br></br>
    </div>
  );
}

export default InputForm;
