import styles from "./Loading.module.css";

type PropTypes = {
  size: "large" | "small";
};
export default function Loading(props: PropTypes) {
  return (
    <div className={styles.loading}>
      <div
        className={
          styles.loading_text +
          (props.size === "small" ? " " + styles.loading_text_small : "")
        }
      >
        AIがフィードバックを準備しています
      </div>
      <div
        className={
          styles.loader +
          (props.size === "small" ? " " + styles.loader_small : "")
        }
      />
    </div>
  );
}
