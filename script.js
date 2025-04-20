const API_KEY = "sk-あなたのAPIキー"; // 必ず自分のAPIキーに置き換える！

async function getReikaResponse(userMessage) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // または "gpt-4"
            messages: [
                { role: "system", content: "あなたは優しく賢いAIの麗花として会話してください。" },
                { role: "user", content: userMessage }
            ]
        })
    });

    const data = await response.json();
    const reikaReply = data.choices?.[0]?.message?.content || "ごめんなさい、うまく返答できませんでした。";
    return reikaReply;
}
    