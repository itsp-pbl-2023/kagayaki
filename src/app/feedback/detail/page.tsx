"use client";

import PdfViewer from "@/app/components/PdfViewer";
import styles from "./page.module.css";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/store";

export default function PageFeedback() {
  const format = `以下に入力するのはプレゼンテーションの一部分です。良い点・悪い点をレビューしてください。方針として、論理性、内容の説明、情報量、口調のそれぞれの良し悪しを意識してください。また、文字数は150字以内としてください。\n\n### 入力 ###\n`;

  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const { lapTime, transcript } = useAppContext();
  const [lapMinutes, setLapMinutes] = useState(0);
  const [lapSeconds, setLapSeconds] = useState(0);
  const [feedback, setFeedback] = useState("");
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ページが切り替わった際の処理
  useEffect(() => {
    setLapMinutes(Math.floor(lapTime[pageNum] / 60000));
    setLapSeconds(Math.floor((lapTime[pageNum] % 60000) / 1000));
  }, [lapTime, pageNum]);

  const displayFeedback = async () => {
    const res = await fetch(`/api/chatgpt/`, {
      method: "POST",
      body: format + transcript[pageNum],
    });
    const data = await res.json();
    console.log(JSON.parse(data["message"]));
    setFeedback(JSON.parse(data["message"]));
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
            displayFeedback();
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
            displayFeedback();
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
        <div className={styles.feedback_text}>
          {/* TODO: 将来的には、実際のフィードバックに置き換える　*/}
          {feedback}
        </div>
      </div>
      <div className={styles.script_container}>
        <div className={styles.script_icon}>
          <i className="bi bi-chat-left-text-fill" />
        </div>
        <div className={styles.script_text}>
          {/* TODO: 将来的には、実際のスクリプトに置き換える　*/}
          {transcript[pageNum]}
        </div>
      </div>
    </main>
  );
}
