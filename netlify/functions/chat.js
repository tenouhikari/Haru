const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "";

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if your key allows
      messages: [
        { role: "system", content: "あなたは可愛らしい声で答えるAIアシスタント、麗花です。" },
        { role: "user", content: userMessage }
      ],
    });

    const reply = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: reply }),
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "エラーが発生しました。" }),
    };
  }
};