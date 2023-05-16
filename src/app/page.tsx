import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import Counter from "./Counter";
import Upload from "./Upload";

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
      <div>
        <Link href="/presentation">発表ページへ</Link>
      </div>
      <div>
        <Link href="/feedback">フィードバックページへ</Link>
      </div>
      <div>
        <Link href="/test/recording">録音のテストページへ</Link>
      </div>
      <div>
        <Link href="/test/chatgpt">ChatGPT APIのテストページへ</Link>
      </div>
      <div>
        <Link href="/test/wisper">Wisper APIのテストページへ</Link>
      </div>
      <div>
        <Counter />
      </div>
      <div>
        <Upload />
      </div>
    </main>
  );
}
