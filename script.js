const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');

// メッセージ表示関数
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

// メッセージ送信処理
sendButton.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText === '') return;
  appendMessage('葩瑠', userText);
  userInput.value = '';

  // 麗花の簡単な返答ロジック
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
} else {
  console.log("音声認識はこのブラウザではサポートされていません。");
}