"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PdfView from "@/app/components/PdfViewer";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  const [numPages, setNumPages] = useState(0);

  const startButton = () => {
    setIsStarted(true);
  };

  const stopButton = () => {
    router.push("/feedback");
  };

  const pageMove = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  };

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <main className={styles.main}>
      <div>ここは発表ページです。</div>
      <div className={styles.link}>
        <Link href="/feedback">フィードバックページへ</Link>
      </div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
      <div>
        <PdfView
          pageNum={pageNum}
          numPages={numPages}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
        />
      </div>
      {!isStarted ? (
        <div>
          <div>まだです</div>
          <div>
            <button onClick={() => startButton()}>再生</button>
          </div>
        </div>
      ) : (
        <div>
          <div>はじまってます</div>
          <div>
            {pageNum < numPages ? (
              <button onClick={() => pageMove()}>次のページへ</button>
            ) : (
              <button onClick={() => stopButton()}>停止</button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
