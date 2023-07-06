"use client";
import { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useAppContext } from "../context/store";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const { lapTime, transcript, feedbacks } = useAppContext();
  const amountMinutes = Math.floor(lapTime.reduce((a, b) => a + b, 0) / 60000);
  const amountSeconds = Math.floor(
    (lapTime.reduce((a, b) => a + b, 0) % 60000) / 1000
  );

  // chatgptからfetchでテキスト取得
  useEffect(() => {
    console.log(transcript);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.top_container}>
        <h1 className={styles.title}>全体フィードバック</h1>
        <Link className={styles.link_button} href="/feedback/detail">
          個別フィードバックへ
        </Link>
      </div>
      <div className={styles.time_container}>
        <div className={styles.amount_time}>
          <div className={styles.amount_time_text}>合計時間</div>
          <div className={styles.amount_time_text_time}>
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
      <div className={styles.questions_container}>
        <div className={styles.questions_title}>想定される質問集</div>
        {feedbacks["questions"] && Array.isArray(feedbacks["questions"]) ? (
          feedbacks["questions"].map((feedback, index) => (
            <div className={styles.question_card} key={index}>
              <div className={styles.question_card_icon}>
                <i className="bi bi-patch-question-fill" />
              </div>
              <div className={styles.question_card_text}>&nbsp;{feedback}</div>
            </div>
          ))
        ) : (
          <div className={styles.question_card}>
            <div className={styles.question_card_icon}>
              <i className="bi bi-patch-question-fill" />
            </div>
            <div className={styles.question_card_text}>
              &nbsp;特に質問はありません。
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
