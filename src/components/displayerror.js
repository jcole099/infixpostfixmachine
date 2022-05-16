function displayError(msg) {
  let answerBox = document.getElementById('answer');
  answerBox.textContent = msg;

  let answerPrompt = document.getElementById('resultPrompt');
  answerPrompt.textContent = 'Error:';
  answerPrompt.classList.remove('correct');
  answerPrompt.classList.add('error');
  return;
}

export default displayError;
