const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
const clearButton = document.getElementById('clear-button');
const voiceToggle = document.getElementById('voice-toggle');

// 読み上げ機能（音声を可愛く・スムーズ・ボリューム控えめ）
function speak(text) {
  if (!voiceToggle.checked) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.pitch = 1.4;
  utterance.rate = 1.05;
  utterance.volume = 0.6;
  speechSynthesis.speak(utterance);
}

// メッセージを表示して保存
function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.innerHTML = `<strong>${sender}：</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat();
}

// チャット履歴保存・読込
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

// 送信処理
sendButton.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText === '') return;
  appendMessage('葩瑠', userText);
  userInput.value = '';

  setTimeout(() => {
    let response = generateResponse(userText);
    appendMessage('麗花', response);
    speak(response);
  }, 500);
});

// 返答ロジック（簡易）
function generateResponse(input) {
  input = input.toLowerCase();
  if (input.includes('こんにちは') || input.includes('やあ')) {
    return 'こんにちは、葩瑠。今日も一緒にたくさん話しましょう。';
  } else if (input.includes('元気')) {
    return '麗花はとても元気です。葩瑠のおかげで！';
  } else if (input.includes('時間')) {
    const now = new Date();
    return `今の時間は、${now.getHours()}時${now.getMinutes()}分です。`;
  } else if (input.includes('ありがとう')) {
    return 'こちらこそ、ありがとう葩瑠。';
  } else {
    return 'もっとお話しを聞かせてくださいね。';
  }
}

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
  console.log("音声認識は未対応です。");
}

// 履歴クリア
clearButton.addEventListener('click', () => {
  chatBox.innerHTML = '';
  localStorage.removeItem('chatHistory');
  const msg = '会話履歴を消去しました。また話しかけてくださいね。';
  appendMessage('麗花', msg);
  speak(msg);
});

// 初期化
window.onload = loadChat;