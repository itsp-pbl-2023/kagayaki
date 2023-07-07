import styles from "./InfoCard.module.css";
import Image from "next/image";

type PropTypes = {
  title: string;
  description: string;
  image: string;
};

export default function InfoCard(props: PropTypes) {
  return (
    <div className={styles.info_card}>
      <Image
        className={styles.info_card_image}
        src={props.image}
        alt="InfoCard Image"
        width={600}
        height={360}
      />
      <h2 className={styles.info_card_title}>{props.title}</h2>
      <p className={styles.info_card_description}>{props.description}</p>
    </div>
  );
}
