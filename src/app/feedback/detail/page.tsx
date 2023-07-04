"use client";

import PdfViewer from "@/app/components/PdfViewer";
import styles from "./page.module.css";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/store";

export default function PageFeedback() {
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const { lapTime, transcript } = useAppContext();
  const [lapMinutes, setLapMinutes] = useState(0);
  const [lapSeconds, setLapSeconds] = useState(0);
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ページが切り替わった際の処理
  useEffect(() => {
    setLapMinutes(Math.floor(lapTime[pageNum] / 60000));
    setLapSeconds(Math.floor((lapTime[pageNum] % 60000) / 1000));
  }, [lapTime, pageNum]);

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
        <div className={styles.feedback_text}>
          {/* TODO: 将来的には、実際のフィードバックに置き換える　*/}
          大変よくできていました。もう少し詳しく説明するとより良いと思います。また、説明の順番を変えるとよりわかりやすいと思います。さらに、説明の前に目次を入れるとより良いと思います。大変よくできていました。もう少し詳しく説明するとより良いと思います。また、説明の順番を変えるとよりわかりやすいと思います。
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