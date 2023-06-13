import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>ここは発表ページです。</div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
}
