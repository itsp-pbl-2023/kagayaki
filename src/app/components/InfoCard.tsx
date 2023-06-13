import styles from "./InfoCard.module.css";

export default function InfoCard() {
  return (
    <div className={styles.info_card}>
      <h2 className={styles.info_card_title}>AIによるフィードバック</h2>
      <p className={styles.info_card_description}>
        AIによる的確なフィードバックを受けることで、発表の質を向上させることができます。
      </p>
    </div>
  );
}
