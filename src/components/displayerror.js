function displayError(msg) {
  let errorMsg = 'Please check your expression.'
  let answerBox = document.getElementById('answer');
  answerBox.textContent = errorMsg;

  let answerPrompt = document.getElementById('resultPrompt');
  answerPrompt.textContent = 'Error:';
  answerPrompt.classList.remove('correct');
  answerPrompt.classList.add('error');
  return;
}

export default displayError;
