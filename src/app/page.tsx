"use client";
import styles from "./page.module.css";
import Upload from "@/app/components/Uploader";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>プレゼンテーションを開始</h1>
      <p className={styles.description}>
        スライドのPDFファイルをアップロードして、発表を開始しよう。
      </p>
      <div>
        <Upload />
      </div>
    </main>
  );
}
