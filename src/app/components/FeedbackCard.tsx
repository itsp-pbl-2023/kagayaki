import styles from "./FeedbackCard.module.css";

type PropType = {
  title: string;
  item: string;
};
export default function FeecbackCard(props: PropType) {
  return (
    <div className={styles.card}>
      <div className={styles.card_title}>{props.title}</div>
      <div className={styles.card_content}>{props.item}</div>
    </div>
  );
}
