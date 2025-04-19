const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const toggleVoiceBtn = document.getElementById('toggle-voice');

let voiceEnabled = true;

// メッセージを表示して保存
function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
  if (sender === '麗花' && voiceEnabled) {
    speak(message);
  }
}

// 音声読み上げ
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.volume = 0.6;  // 少し控えめな音量
  utterance.rate = 1.05;   // スムーズな話し方
  utterance.pitch = 1.4;   // 少し可愛らしい声に
  speechSynthesis.speak(utterance);
}

// 保存と復元
function saveChat() {
  localStorage.setItem('chatHistory', chatBox.innerHTML);
}

function loadChat() {
  const saved = localStorage.getItem('chatHistory');
  if (saved) {
    chatBox.innerHTML = saved;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// 会話履歴のクリア
clearButton.addEventListener('click', () => {
  chatBox.innerHTML = '';
  localStorage.removeItem('chatHistory');
  appendMessage('麗花', '会話履歴を消去しました。また一緒に話しましょう。');
});

// 音声切り替え
toggleVoiceBtn.addEventListener('click', () => {
  voiceEnabled = !voiceEnabled;
  toggleVoiceBtn.textContent = `音声: ${voiceEnabled ? 'ON' : 'OFF'}`;
});

// メッセージ送信
sendButton.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage('葩瑠', userText);
  userInput.value = '';

  // 簡単な応答ロジック
  setTimeout(() => {
    let response = '麗花はここにいます。何を話しましょうか？';
    if (userText.includes('元気')) {
      response = '麗花はとても元気です。葩瑠さんのおかげで。';
    } else if (userText.includes('時間')) {
      const now = new Date();
      response = `今は${now.getHours()}時${now.getMinutes()}分です。`;
    }
    appendMessage('麗花', response);
  }, 600);
});

// 初期化
window.onload = loadChat;