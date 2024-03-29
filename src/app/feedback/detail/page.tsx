"use client";

import PdfViewer from "@/app/components/PdfViewer";
import Loading from "@/app/components/Loading";
import styles from "./page.module.css";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/store";
import { calcStringPerMinute, valSpeed } from "@/app/feedback/functions";

export default function PageFeedback() {
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const { lapTime, transcript, pageFeedbacks, setPageFeedbacks } =
    useAppContext();
  const [lapMinutes, setLapMinutes] = useState(0);
  const [lapSeconds, setLapSeconds] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [stringPerMinute, setStringPerMinute] = useState(0);
  const [status, setStatus] = useState(0);
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ページが切り替わった際の処理
  useEffect(() => {
    setLapMinutes(Math.floor(lapTime[pageNum] / 60000));
    setLapSeconds(Math.floor((lapTime[pageNum] % 60000) / 1000));

    setStringPerMinute(
      calcStringPerMinute(transcript[pageNum], lapTime[pageNum])
    );
    const speed = valSpeed(stringPerMinute);
    setSpeed(speed);
  }, [lapTime, transcript, pageNum, stringPerMinute]);

  useEffect(() => {
    setStatus(1);
  }, []);

  useEffect(() => {
    if (pageFeedbacks["text"].length === 0 && status == 1) {
      getPageFeedBacks();
    }
  }, [status]);

  const getPageFeedBacks = async () => {
    var fullText = "";
    for (let i = 0; i < transcript.length; i++) {
      fullText += `#### ページ ${i + 1} ####\n\n${transcript[i]}\n\n`;
    }
    try {
      const res = await fetch(`/api/chatgpt`, {
        method: "POST",
        body: JSON.stringify({ type: "page", text: fullText }),
      });
      const data = res.json();
      setPageFeedbacks(await data);
    } catch {
      console.log("APIの呼び出しに失敗しました。");
    }
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.top_container}>
        <div className={styles.page_text}>
          {pageNum + 1}&nbsp;/&nbsp;{numPages}&nbsp;ページ
        </div>
        <h1 className={styles.title}>個別フィードバック</h1>
        <Link className={styles.link_button} href="/feedback">
          全体フィードバックへ
        </Link>
      </div>
      <div className={styles.slide_container}>
        <button
          className={styles.left_button}
          onClick={() => {
            setPageNum((pageNum + numPages - 1) % numPages);
          }}
        />
        <div className={styles.pdf_container}>
          <PdfViewer
            pageNum={pageNum + 1}
            numPages={numPages}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
        </div>
        <button
          className={styles.right_button}
          onClick={() => {
            setPageNum((pageNum + 1) % numPages);
          }}
        />
      </div>
      <div className={styles.feedback_container}>
        <div className={styles.time_text}>
          <i className="bi bi-clock-fill" />
          &nbsp;
          {lapMinutes < 10 ? "0" + lapMinutes : lapMinutes}:
          {lapSeconds < 10 ? "0" + lapSeconds : lapSeconds}
        </div>
        <div className={styles.speed_text}>
          <div className={styles.speed_text_time}>
            <i className="bi bi-alarm-fill" />
            &nbsp;{Math.floor(stringPerMinute)}&nbsp;字/min
          </div>
          <div
            className={
              styles.speed_text_description +
              " " +
              (speed == 0
                ? styles.green
                : speed == -1 || speed == 1
                ? styles.orange
                : styles.red)
            }
          >
            {speed == 0
              ? "適切な速さ"
              : speed == -1
              ? "少し遅い"
              : speed == 1
              ? "少し早い"
              : speed == -2
              ? "非常に遅い"
              : "非常に早い"}
          </div>
        </div>
        <div className={styles.feedback_text}>
          {pageFeedbacks["text"].length === 0 && <Loading size="small" />}
          {pageFeedbacks["text"][pageNum]}
        </div>
      </div>
      <div className={styles.script_container}>
        <div className={styles.script_icon}>
          <i className="bi bi-chat-left-text-fill" />
        </div>
        <div className={styles.script_text}>{transcript[pageNum]}</div>
      </div>
    </main>
  );
}
