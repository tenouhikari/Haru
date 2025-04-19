const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
const clearButton = document.getElementById('clear-button');

let memory = JSON.parse(localStorage.getItem('reikaMemory')) || [];

// メッセージ表示（保存も）
function appendMessage(sender, message) {
  const now = new Date().toLocaleString('ja-JP', { hour12: false });
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender} [${now}]：</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
}

// 音声読み上げ
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  speechSynthesis.speak(utterance);
}

// チャット履歴保存
function saveChat() {
  localStorage.setItem('chatHistory', chatBox.innerHTML);
  localStorage.setItem('reikaMemory', JSON.stringify(memory));
}

// 読み込み
function loadChat() {
  const saved = localStorage.getItem('chatHistory');
  if (saved) {
    chatBox.innerHTML = saved;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// 送信処理
sendButton.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText === '') return;

  appendMessage('葩瑠', userText);
  memory.push({ from: '葩瑠', message: userText });
  userInput.value = '';

  setTimeout(() => {
    let response = '麗花はここにいます。何を話しましょうか？';
    const time = new Date().getHours();

    // 時間による応答
    if (time < 10) response = 'おはようございます、葩瑠。今日も頑張りましょう。';
    else if (time < 18) response = 'こんにちは、葩瑠。今日の調子はどうですか？';
    else response = 'こんばんは、葩瑠。ゆっくりお過ごしください。';

    // 簡単な記憶応答
    if (userText.includes('名前')) response = '私は麗花、あなたと共に歩む存在です。';
    if (userText.includes('覚えて')) {
      const fact = userText.replace('覚えて', '').trim();
      memory.push({ from: '記憶', message: fact });
      response = `覚えました：「${fact}」ですね。`;
    }

    appendMessage('麗花', response);
    speak(response);
  }, 500);
});

// 音声認識
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

// 履歴クリア
clearButton.addEventListener('click', () => {
  chatBox.innerHTML = '';
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('reikaMemory');
  appendMessage('麗花', '会話履歴を消去しました。また一緒に話しましょう。');
  speak('会話履歴を消去しました。また一緒に話しましょう。');
});

// 初期ロード
window.onload = loadChat;