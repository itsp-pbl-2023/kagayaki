"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Upload from "@/app/components/Uploader";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Upload />
      </div>
      <div>
        <Link href="/test">テストページへ</Link>
      </div>
      <div>
        <Link href="/presentation">発表ページへ</Link>
      </div>
    </main>
  );
}
