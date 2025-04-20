import { Configuration, OpenAIApi } from "openai";
import express from "express";
import serverless from "serverless-http";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("ユーザーからのメッセージ:", message);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0]?.message?.content;
    console.log("麗花の返答:", reply);

    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ reply: "APIエラーが発生しました。" });
  }
});

export const handler = serverless(app);