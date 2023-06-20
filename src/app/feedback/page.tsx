import FeedbackCard from "../components/FeedbackCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>フィードバック</h1>
      <div className={styles.container}>
        <FeedbackCard title="説明" item="explanation" />
        <FeedbackCard title="論理性" item="logic" />
        <FeedbackCard title="フィードバック" item="explanation" />
        <FeedbackCard title="フィードバック" item="explanation" />
      </div>
    </main>
  );
}
