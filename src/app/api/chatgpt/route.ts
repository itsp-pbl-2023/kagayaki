import { Configuration, OpenAIApi } from "openai";

export async function POST(req: Request) {
  console.log(process.env);
  const prompt = req.body;
  console.log(prompt);
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  console.log(configuration);
  const openai = new OpenAIApi(configuration);
  console.log("start");
  if (!configuration.apiKey) {
    // "OpenAI API key not configured, please follow instructions in README.md"
    console.log("config読み込めてないよ");
    return;
  }
  console.log("config読み込めてるよ");

  try {
    // 設定を諸々のせてAPIとやり取り
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "hello",
        },
      ],
      max_tokens: 100,
    });
    // GPTの返答を取得
    console.log("動いてますよー");
    console.log(completion.data.choices[0].message);
    const data = JSON.stringify({
      message: completion.data.choices[0].message?.content,
    });
    return new Response(data);
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}
