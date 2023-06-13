"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // const data: any = await handler();
  // 発行したAPI Keyを使って設定を定義
  const [data, setData] = useState("");
  const onClickHandler = async () => {
    console.log("クリックされました");
    const res = await fetch(`/api/chatgpt/`, {
      method: "POST",
      body: "hello",
    });
    console.log("API実行完了");
    const data = await res.json();
    setData(data.message);
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
