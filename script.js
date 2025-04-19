const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
const clearButton = document.getElementById('clear-button');

// メッセージ表示関数（保存も行う）
function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat(); // 追加時に保存
}

// 音声読み上げ機能
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  speechSynthesis.speak(utterance);
}

// 会話履歴を保存
function saveChat() {
  localStorage.setItem('chatHistory', chatBox.innerHTML);
}

// ページ読み込み時に履歴を復元
function loadChat() {
  const saved = localStorage.getItem('chatHistory');
  if (saved) {
    chatBox.innerHTML = saved;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// チャット履歴をクリア
clearButton.addEventListener('click', () => {
  chatBox.innerHTML = '';
  localStorage.removeItem('chatHistory');
  appendMessage('麗花', '会話履歴を消去しました。また一緒に話しましょう。');
  speak('会話履歴を消去しました。また一緒に話しましょう。');
});

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
    speak(response);
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

// ページ読み込み時に履歴をロード
window.onload = loadChat;