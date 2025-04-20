const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const toggleVoiceButton = document.getElementById("toggle-voice");

let voiceEnabled = true;

// メッセージを表示する関数
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.textContent = `${sender}: ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 音声で読み上げる関数
function speak(text) {
  if (!voiceEnabled) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google") || voice.lang === "ja-JP");
  utterance.rate = 1;
  utterance.pitch = 1.2;
  utterance.volume = 0.6;
  speechSynthesis.speak(utterance);
}

// メッセージを送信する関数
async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  addMessage("葩瑠", input);
  userInput.value = "";

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    const reply = data.reply;
    addMessage("麗花", reply);
    speak(reply);
  } catch (error) {
    addMessage("システム", "エラーが発生しました。");
  }
}

// 音声切り替えボタン
toggleVoiceButton.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;
  toggleVoiceButton.textContent = `音声: ${voiceEnabled ? "オン" : "オフ"}`;
});

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
    