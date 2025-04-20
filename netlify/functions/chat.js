import { Configuration, OpenAIApi } from "openai";
import express from "express";
import serverless from "serverless-http";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // ← Netlifyに設定したAPIキーがここに入ります
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // ここは gpt-4 にしてもOK（有料プラン）
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply }); // ← ココ！これが reply に入っていないとフロントで undefined になります
  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    res.status(500).json({ error: "OpenAI API からの応答に失敗しました。" });
  }
});

export const handler = serverless(app);