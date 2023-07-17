import { allPrompt, pagePrompt } from "./prompts";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: Request) {
  // JSON型のbodyを取得
  const { type, text } = await new Response(req.body).json();
  const prompt = type === "all" ? allPrompt : pagePrompt;

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  if (!configuration.apiKey) {
    return;
  }

  try {
    // 設定を諸々のせてAPIとやり取り
    console.log(prompt + text);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt + text,
        },
      ],
    });
    // GPTの返答を取得
    const data = completion.data.choices[0].message?.content;
    console.log(data);
    return new Response(data);
  } catch (error: any) {}
}
