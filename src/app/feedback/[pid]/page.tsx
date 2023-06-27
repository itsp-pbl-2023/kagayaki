"use client";

import PdfViewer from "@/app/components/PdfViewer";
import styles from "./page.module.css";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/store";

export default function PageFeedback({ params }: { params: { pid: string } }) {
  const [numPages, setNumPages] = useState(0);
  const { lapTime } = useAppContext();
  const lapMinutes = Math.floor(lapTime[Number(params.pid) - 1] / 60000);
  const lapSeconds = Math.floor(
    (lapTime[Number(params.pid) - 1] % 60000) / 1000
  );
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.top_container}>
        <div className={styles.page_text}>
          {params.pid}&nbsp;/&nbsp;{numPages}&nbsp;ページ
        </div>
        <h1 className={styles.title}>個別フィードバック</h1>
        <Link className={styles.link_button} href="/feedback">
          全体フィードバックへ
        </Link>
      </div>
      <div className={styles.slide_container}>
        <Link
          className={styles.left_button}
          href={`/feedback/${Math.max(1, Number(params.pid) - 1)}`}
        />
        <div className={styles.pdf_container}>
          <PdfViewer
            pageNum={Number(params.pid)}
            numPages={numPages}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
        </div>
        <Link
          className={styles.right_button}
          href={`/feedback/${Math.min(numPages, Number(params.pid) + 1)}`}
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
          このスライドについて説明します。まず、このスライドでは、スライドの構成について説明します。次に、スライドの構成について説明します。最後に、スライドの構成について説明します。このスライドについて説明します。まず、このスライドでは、スライドの構成について説明します。次に、スライドの構成について説明します。最後に、スライドの構成について説明します。
          このスライドについて説明します。まず、このスライドでは、スライドの構成について説明します。次に、スライドの構成について説明します。最後に、スライドの構成について説明します。
          このスライドについて説明します。まず、このスライドでは、スライドの構成について説明します。次に、スライドの構成について説明します。最後に、スライドの構成について説明します。
        </div>
      </div>
    </main>
  );
}
