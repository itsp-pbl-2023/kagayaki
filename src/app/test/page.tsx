import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Counter from "@/app/components/Counter";
import HelloForm from "../components/HelloForm";

export default function Home() {
  return (
    <main className={styles.main}>
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
        <Link href="/">ルートページへ</Link>
      </div>
      <div>
        <Counter />
      </div>
      <div>
        <HelloForm />
      </div>
      <div className={styles.image}>
        <Image
          src="/kagayaki.png"
          alt="KAGAYAKIの大地"
          width={100}
          height={100}
        />
      </div>
    </main>
  );
}
