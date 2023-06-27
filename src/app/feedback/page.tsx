"use client";
import { useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useAppContext } from "../context/store";
import styles from "./page.module.css";

export default function Home() {
  const [apicalled, setApicalled] = useState(false);
  const { lapTime, setFeedbacks, transcript } = useAppContext();
  const amountMinutes = Math.floor(lapTime.reduce((a, b) => a + b, 0) / 60000);
  const amountSeconds = Math.floor(
    (lapTime.reduce((a, b) => a + b, 0) % 60000) / 1000
  );

  // chatgptからfetchでテキスト取得
  useEffect(() => {
    if (!apicalled) {
      getFeedbacks();
      setApicalled(true);
    }
  }, []);

  const getFeedbacks = async () => {
    console.log("feedback useEffect()");
    console.log(transcript);

    if (!apicalled) {
      // const res = await fetch(`/api/chatgpt/`, {
      //   method: "POST",
      //   body: fullText,
      // });
      // const data = await res.json();
      // console.log(data);
    }
    setApicalled(true);
    // const data = {
    //   explanation:
    //     "説明はわかりやすかったです。もう少し詳しく説明するとより良いと思います。",
    //   logic: "極めて論理的で、わかりやすい説明でした。",
    //   informativeness: "情報量は十分でした。",
    //   fluency: "流暢な説明でした。",
    // };
    // setFeedbacks(data);
  };
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>フィードバック</h1>
      <div className={styles.time_container}>
        <div className={styles.amount_time}>
          <div className={styles.amount_time_text}>合計時間</div>
          <div className={styles.amount_time_text}>
            <i className="bi bi-clock-fill" />
            &nbsp;{amountMinutes < 10 ? "0" + amountMinutes : amountMinutes}:
            {amountSeconds < 10 ? "0" + amountSeconds : amountSeconds}
          </div>
        </div>
        <div className={styles.lap_time}>
          {lapTime.map((time, index) => {
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            return (
              <div key={index} className={styles.lap_time_text}>
                {index + 1}ページ目
                <div className={styles.lap_time_divide_border} />
                <i className="bi bi-clock-fill" />
                &nbsp;{minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.feedback_container}>
        <FeedbackCard title="説明" item="explanation" />
        <FeedbackCard title="論理性" item="logic" />
        <FeedbackCard title="情報量" item="informativeness" />
        <FeedbackCard title="流暢性" item="fluency" />
      </div>
    </main>
  );
}
