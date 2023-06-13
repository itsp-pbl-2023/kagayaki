"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PdfView from "@/app/components/PdfViewer";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const router = useRouter();

  const startButton = () => {
    setIsStarted(true);
  };

  const stopButton = () => {
    router.push("/feedback");
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
        <PdfView />
      </div>
      {isStarted && (
        <div>
          <div>はじまってます</div>
          <div>
            <button onClick={() => stopButton()}>停止</button>
          </div>
        </div>
      )}
      {!isStarted && (
        <div>
          <div>まだです</div>
          <div>
            <button onClick={() => startButton()}>再生</button>
          </div>
        </div>
      )}
    </main>
  );
}
