import styles from "./InfoCard.module.css";

export default function InfoCard() {
  return (
    <div className={styles.info_card}>
      <div className={styles.info_card__header}>
        <h2 className={styles.info_card__title}>KAGE打</h2>
      </div>
      <div className={styles.info_card__body}>
        <p className={styles.info_card__description}>
          スライドのPDFファイルをアップロードして、発表を開始しよう。
        </p>
      </div>
    </div>
  );
}
