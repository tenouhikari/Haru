const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText === '') return;
  appendMessage('葩瑠', userText);
  userInput.value = '';

  // 簡単な応答
  setTimeout(() => {
    let response = '麗花はここにいます。何を話しましょうか？';
    if (userText.includes('元気')) {
      response = '麗花はとても元気です。葩瑠さんのおかげで。';
    }
    appendMessage('麗花', response);
  }, 500);
});
