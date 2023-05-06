import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>ようこそ！KAGAYAKIの大地へ。</div>
      <div className={styles.image}>
        <Image
          src="/kagayaki.png"
          alt="KAGAYAKIの大地"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.link}>
        <Link href="/presentation">発表ページへ</Link>
      </div>
    </main>
  );
}
