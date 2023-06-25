"use client";
import { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useAppContext } from "../context/store";
import styles from "./page.module.css";

export default function Home() {
  const { setFeedbacks } = useAppContext();
  // chatgptからfetchでテキスト取得
  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = async () => {
    /*
    const res = await fetch(`/api/chatgpt/`, {
      method: "POST",
      body: "hello",
    });
    const data = await res.json();
    console.log(data);
    */
    const data = {
      explanation:
        "説明はわかりやすかったです。もう少し詳しく説明するとより良いと思います。",
      logic: "極めて論理的で、わかりやすい説明でした。",
      informativeness: "情報量は十分でした。",
      fluency: "流暢な説明でした。",
    };
    setFeedbacks(data);
  };
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>フィードバック</h1>
      <div className={styles.container}>
        <FeedbackCard title="説明" item="explanation" />
        <FeedbackCard title="論理性" item="logic" />
        <FeedbackCard title="情報量" item="informativeness" />
        <FeedbackCard title="流暢性" item="fluency" />
      </div>
    </main>
  );
}
