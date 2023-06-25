"use client";
import { useAppContext } from "../context/store";
import styles from "./FeedbackCard.module.css";

type PropType = {
  title: string;
  item: "explanation" | "logic" | "informativeness" | "fluency";
};
export default function FeecbackCard(props: PropType) {
  const { feedbacks } = useAppContext();
  return (
    <div className={styles.card}>
      <div className={styles.card_title}>
        <i className="bi bi-chat-left-dots-fill" />
        &nbsp;
        {props.title}
      </div>
      <div className={styles.card_content}>{feedbacks[props.item]}</div>
    </div>
  );
}
