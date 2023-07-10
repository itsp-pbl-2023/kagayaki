"use client";
import { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useAppContext } from "../context/store";
import styles from "./page.module.css";
import Link from "next/link";

export const calStringPerMinute = (text: string, time: number) => {
  //const minutes = lapTime.reduce((a, b) => a + b, 0) / 60000;
  const minutes = time / 60000;
  //const stringSize = transcript.reduce((a, b) => a + b, "").length;
  const stringSize = text.length;
  return stringSize / minutes;
};

export const valSpeed = (sizePerMinute: number) => {
  console.log("number:");
  console.log(sizePerMinute);
  const bestStringSize = 300;
  const goodRate: number = 0.2;
  const badRate = 0.5;
  const speed = (sizePerMinute - bestStringSize) / bestStringSize;
  console.log("speed:");
  console.log(speed);
  if (-goodRate < speed && speed < goodRate) {
    return 0;
  }
  if (-badRate < speed && speed < -goodRate) {
    return -1;
  }
  if (goodRate < speed && speed < badRate) {
    return 1;
  }
  if (speed < -badRate) {
    return -2;
  }
  return 2;
};

export default function Home() {
  const { lapTime, transcript } = useAppContext();
  const amountMinutes = Math.floor(lapTime.reduce((a, b) => a + b, 0) / 60000);
  const amountSeconds = Math.floor(
    (lapTime.reduce((a, b) => a + b, 0) % 60000) / 1000
  );

  const totalStringPerMinute = calStringPerMinute(
    transcript.reduce((a, b) => a + b, ""),
    lapTime.reduce((a, b) => a + b, 0)
  );

  const totalSpeed = valSpeed(totalStringPerMinute);

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
        <div className={styles.amount_speed}>
          <div className={styles.amount_speed_text}>発音スピード</div>
          <div
            className={
              styles.amount_speed_text_time +
              " " +
              (totalSpeed == 0
                ? styles.green
                : totalSpeed == -1 || totalSpeed == 1
                ? styles.orange
                : styles.red)
            }
          >
            <div>
              <i className="bi bi-alarm-fill" />
              &nbsp;{Math.floor(totalStringPerMinute)}&nbsp;字/分
            </div>
            <div>
              {totalSpeed == 0
                ? "完璧です"
                : totalSpeed == -1
                ? "少し遅いです"
                : totalSpeed == 1
                ? "少し早いです"
                : totalSpeed == -2
                ? "非常に遅いです"
                : "非常に早いです"}
            </div>
          </div>
        </div>
        <div className={styles.lap_time}>
          {lapTime.map((time, index) => {
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            const text = transcript[index];
            const stringPerMinute = calStringPerMinute(text, time);
            const speed = valSpeed(stringPerMinute);
            return (
              <div key={index} className={styles.lap_time_text}>
                {index + 1}ページ目
                <div className={styles.lap_time_divide_border} />
                <i className="bi bi-clock-fill" />
                &nbsp;{minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
                <div
                  className={
                    speed == 0
                      ? styles.green
                      : speed == -1 || speed == 1
                      ? styles.orange
                      : styles.red
                  }
                >
                  &nbsp;
                  <i className="bi bi-alarm-fill" />
                  &nbsp;
                  {speed == 0
                    ? "完璧です"
                    : speed == -1
                    ? "少し遅いです"
                    : speed == 1
                    ? "少し早いです"
                    : speed == -2
                    ? "非常に遅いです"
                    : "非常に早いです"}
                </div>
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
