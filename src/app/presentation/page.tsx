"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import PdfView from "@/app/components/PdfViewer";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useAppContext } from "../context/store";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  const [numPages, setNumPages] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerSecond, setTimerSecond] = useState(0);
  const { lapTime, setLapTime } = useAppContext();
  const [lastTime, setLastTime] = useState(0);

  const startButton = () => {
    setIsStarted(true);
    // 経過時間を表示する
    setLastTime(Date.now());
    const tmp = Date.now();
    setLapTime([]);
    setInterval(() => {
      const elapsedTime = Date.now() - tmp;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      setTimerMinute(minutes);
      setTimerSecond(seconds);
    }, 10);
  };

  const nextButton = () => {
    const elapsedTime = Date.now() - lastTime;
    setLastTime(Date.now());
    setLapTime([...lapTime, elapsedTime]);
    setPageNum(pageNum + 1);
  };

  const stopButton = () => {
    const elapsedTime = Date.now() - lastTime;
    setLapTime([...lapTime, elapsedTime]);
    router.push("/feedback");
  };

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <main className={styles.main}>
      <div className={styles.nav_container}>
        <div className={styles.page_text}>
          ページ&nbsp;
          {pageNum} / {numPages}
        </div>
        {isStarted ? (
          <div className={styles.status_text}>
            <i className={"bi bi-record-circle-fill " + styles.on_recording} />
            &nbsp;録音中
          </div>
        ) : (
          <div className={styles.status_text}>
            <i className={"bi bi-stop-fill " + styles.on_waiting} />
            &nbsp;録音待機中
          </div>
        )}
        <div className={styles.timer_text}>
          <i className="bi bi-clock-fill" />
          &nbsp;
          {timerMinute < 10 ? "0" + timerMinute : timerMinute}:
          {timerSecond < 10 ? "0" + timerSecond : timerSecond}
        </div>
      </div>
      <div className={styles.slide_container}>
        <PdfView
          pageNum={pageNum}
          numPages={numPages}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
        />
      </div>
      <div className={styles.button_container}>
        {!isStarted ? (
          <button className={styles.button_start} onClick={() => startButton()}>
            スタート
          </button>
        ) : pageNum < numPages ? (
          <button className={styles.button_next} onClick={() => nextButton()}>
            次のページへ
          </button>
        ) : (
          <button className={styles.button_stop} onClick={() => stopButton()}>
            終了
          </button>
        )}
      </div>
    </main>
  );
}
