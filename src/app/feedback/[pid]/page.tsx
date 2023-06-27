"use client";

import PdfViewer from "@/app/components/PdfViewer";
import styles from "./page.module.css";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useState } from "react";
import Link from "next/link";

export default function PageFeedback({ params }: { params: { pid: string } }) {
  const [numPages, setNumPages] = useState(0);
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <main className={styles.main}>
      <div className={styles.top_container}>
        <h1 className={styles.title}>個別フィードバック</h1>
        <Link className={styles.link_button} href="/feedback">
          全体フィードバックへ
        </Link>
      </div>
      <div className={styles.slide_container}>
        <PdfViewer
          pageNum={Number(params.pid)}
          numPages={numPages}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
        />
      </div>
    </main>
  );
}
