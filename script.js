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
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 音声読み上げ機能
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  speechSynthesis.speak(utterance);
}

sendButton.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText === '') return;
  appendMessage('葩瑠', userText);
  userInput.value = '';

  // 簡単な応答例
  setTimeout(() => {
    let response = '麗花はここにいます。何を話しましょうか？';
    if (userText.includes('元気')) {
      response = '麗花はとても元気です。葩瑠さんのおかげで。';
    }
    appendMessage('麗花', response);
    speak(response); // 読み上げ
  }, 500);
});

// 音声入力機能
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = false;

  micButton.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = function(event) {
    const result = event.results[0][0].transcript;
    userInput.value = result;
  };
}