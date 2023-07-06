"use client";
import InfoCard from "@/app/components/InfoCard";
import styles from "./page.module.css";
import Upload from "@/app/components/Uploader";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>プレゼンテーションを開始</h1>
      <p className={styles.description}>
        スライドのPDFファイルをアップロードして、発表を開始しましょう。
      </p>
      <div>
        <Upload />
      </div>
      <div>
        <InfoCard
          title="AIによるフィードバック"
          description="AIによる的確なフィードバックを受けることで、発表の質を向上させることができます。発表全体に対する項目別のフィードバックに加えて、スライドのページ毎のフィードバックも受けることができます。"
          image="/info_1.jpg"
        />
        <InfoCard
          title="発表音声を文字起こしで確認"
          description="AIが自動で文字起こしを行ったスクリプトは、発表後にページごとに確認することができます。時間に対する発話速度も数値化され、発表速度の改善に役立てることができます。"
          image="/info_2.jpg"
        />
        <InfoCard
          title="AIによる想定質問の生成"
          description="発表した内容に対してAIが複数の想定質問を生成します。自分では気が付かなかったプレゼン内容の不足点や注目点を発見することにより、発表後の質疑応答にも備えることができます。"
          image="/info_3.jpg"
        />
      </div>
    </main>
  );
}
