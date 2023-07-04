import styles from "./Loading.module.css";
export default function Loading() {
  console.log("loading");
  return (
    <div className={styles.loading}>
      <div className={styles.loading_text}>
        AIがフィードバックを準備しています
      </div>
      <div className={styles.loader} />
    </div>
  );
}
