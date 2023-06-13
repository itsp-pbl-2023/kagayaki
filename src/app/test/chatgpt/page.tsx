"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

async function handler() {
  console.log(process.env);
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
    console.log("動いてますよー");
    console.log(completion.data.choices[0].message);
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

export default function Home() {
  // const data: any = await handler();
  // 発行したAPI Keyを使って設定を定義
  const [data, setData] = useState("");
  const onClickHandler = async () => {
    await handler().then((res: any) => {
      console.log("API実行完了");
      setData(res?.content);
    });
    return;
  };
  return (
    <main className={styles.main}>
      <div>ここはChatGPT APIのテストページです。</div>
      <button onClick={() => onClickHandler()}>ボタン</button>
      {/* {data && <div>{data.content}</div>} */}
      <div>{data}</div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
}
