import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.title} href="/">
        KAGE打
      </Link>
    </header>
  );
}
