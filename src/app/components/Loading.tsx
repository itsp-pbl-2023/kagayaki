import styles from "./Loading.module.css";
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading_text}>
        AIがフィードバックを準備しています
      </div>
      <div className={styles.loader} />
    </div>
  );
}
