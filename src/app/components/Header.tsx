import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>発表支援ツール KAGAYAKI</div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </header>
  );
}
