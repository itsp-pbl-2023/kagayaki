"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // 発行したAPI Keyを使って設定を定義
  const [data, setData] = useState("");
  const onClickHandler = async () => {
    const res = await fetch(`/api/chatgpt/`, {
      method: "POST",
      body: "hello",
    });
    const data = await res.json();
    setData(data.message);
  };
  return (
    <main className={styles.main}>
      <div>ここはChatGPT APIのテストページです。</div>
      <button onClick={() => onClickHandler()}>ボタン</button>
      <div>{data}</div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
}
