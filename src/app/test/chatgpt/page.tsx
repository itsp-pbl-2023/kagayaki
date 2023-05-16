import styles from "./page.module.scss";
import Link from "next/link";
import { Configuration, OpenAIApi } from "openai";

// 発行したAPI Keyを使って設定を定義
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

async function handler() {
  if (!configuration.apiKey) {
    // "OpenAI API key not configured, please follow instructions in README.md"
    return;
  }

  // GPTに送るメッセージを取得
  //   const message =

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
      temperature: 0.9,
      max_tokens: 100,
    });
    // GPTの返答を取得
    return completion.data.choices[0].message;
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      //   res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      //   res.status(500).json({
      //     error: {
      //       message: "An error occurred during your request.",
      //     },
      //   });
    }
  }
}

export default async function Home() {
  const data: any = await handler();
  console.log(data);
  return (
    <main className={styles.main}>
      <div>ここはChatGPT APIのテストページです。</div>
      {data && <div>{data.content}</div>}

      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
}
