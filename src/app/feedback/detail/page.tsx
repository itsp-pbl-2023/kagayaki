"use client";

import PdfViewer from "@/app/components/PdfViewer";
import styles from "./page.module.css";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/app/context/store";

const testPresentations = [
  `これから「ジュゴンとマナティーの違いについて」のプレゼンテーションを開始します。`,
  `まず、それぞれの動物について説明していきます。その後で、ジュゴンとマナティーの写真をお見せしますね。
  さて、ジュゴンはクジラ目に属する海棲哺乳類です。体長は約四十～六十センチメートル。尾びれには大きな扇形の白い斑点があります。鼻孔から口にかけて、長く伸びる黒い筋があるのが特徴です。この黒い線は側線といい、ジュゴンやマナティはこの線に沿って泳ぐことができます。
  ジュゴンは主に亜熱帯の海に生息しています。群れをつくって生活し、数頭で一緒に行動することも多いようです。単独行動をとることもありますが、餌を獲る際には仲間の助けを借りることが多いそうです。また、海藻を食べるため、プランクトンを捕食する他のクジラ類とは生態が大きく異なります。そのため、食物連鎖の枠組みからも外れていると考えられています。`,
  `一方、マナティーもジュゴンと同じくクジラ目に属しています。マナティーは体長約三十五センチメートルの小型の海洋哺乳動物です。体の色は白っぽい灰色で、背中に茶色い斑模様があり、尾びれにも茶色い斑があります。ジュゴンとマナティーの違いは、体の大きさと、鼻先にある一対の小さな突起物の有無です。これは角だと思われがちですが、実際には角ではなく、吻という器官です。吻の先端は鋭く尖っており、ここに獲物を突き刺して捕らえたり、えものを食べたりするのだといわれています。
  マナティーは南大西洋の沖合に生息する深海魚食性の海獣です。水深二百メートル以上のところに棲んでいます。主に硬骨魚類を好んで食べることから、かつては鯨食性であったのではないかともいわれていました。しかし現在では、肉食性の傾向が強いと考えられているのです。
  ジュゴンは単独でいることが多いのに対し、マナティーはよく群れを作って行動しています。そのため、マナティーが生息する海域へジュゴンが迷い込むこともあるそうです。このような場合、互いに攻撃し合うことはありません。むしろ、ジュゴンの方がマナティーに対して気を使ってしまうほどなのだとか。`,
  `それでは、実際に写真を見てみましょう。
  こちらはジュゴンの写真です。
  こちらがジュゴンですね。
  続いて、こちらはマナティーの写真です。
  次はマナティーの写真です。最後に、ジュゴンとマナティーを比較した写真をお見せしますね。
  このように、見た目は似ているものの、それぞれの特徴は大きく異なることが分かりました。マナティーの方は少し可愛らしい顔をしているような気がしますよね。ちなみに、マナティーの名前の由来は、その顔つきから来ていると言われていますよ。`,
];

export default function PageFeedback() {
  const format = `### 指示 ###\n以下に入力するのはプレゼンテーションの一部分です。良い点・悪い点をレビューしてください。方針として、論理性、内容の説明、情報量、口調のそれぞれの良し悪しを意識してください。また、文字数は150字以内としてください。\n\n### 出力例 ###\n富士山について詳細な説明がされています。ただし、世界で一番高い山であるという情報は誤りです。\n\n### 入力 ###\n`;

  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const { lapTime, transcript } = useAppContext();
  const [lapMinutes, setLapMinutes] = useState(0);
  const [lapSeconds, setLapSeconds] = useState(0);
  const [feedback, setFeedback] = useState("");
  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ページが切り替わった際の処理
  useEffect(() => {
    setLapMinutes(Math.floor(lapTime[pageNum] / 60000));
    setLapSeconds(Math.floor((lapTime[pageNum] % 60000) / 1000));
  }, [lapTime, pageNum]);

  const displayFeedback = async () => {
    const res = await fetch(`/api/chatgpt/`, {
      method: "POST",
      //body: format + transcript[pageNum],
      body: format + testPresentations[pageNum],
    });
    const data = await res.json();
    console.log(JSON.parse(data["message"]));
    setFeedback(JSON.parse(data["message"]));
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.top_container}>
        <div className={styles.page_text}>
          {pageNum + 1}&nbsp;/&nbsp;{numPages}&nbsp;ページ
        </div>
        <h1 className={styles.title}>個別フィードバック</h1>
        <Link className={styles.link_button} href="/feedback">
          全体フィードバックへ
        </Link>
      </div>
      <div className={styles.slide_container}>
        <button
          className={styles.left_button}
          onClick={() => {
            setPageNum((pageNum + numPages - 1) % numPages);
            displayFeedback();
          }}
        />
        <div className={styles.pdf_container}>
          <PdfViewer
            pageNum={pageNum + 1}
            numPages={numPages}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
          />
        </div>
        <button
          className={styles.right_button}
          onClick={() => {
            setPageNum((pageNum + 1) % numPages);
            displayFeedback();
          }}
        />
      </div>
      <div className={styles.feedback_container}>
        <div className={styles.time_text}>
          <i className="bi bi-clock-fill" />
          &nbsp;
          {lapMinutes < 10 ? "0" + lapMinutes : lapMinutes}:
          {lapSeconds < 10 ? "0" + lapSeconds : lapSeconds}
        </div>
        <div className={styles.feedback_text}>
          {/* TODO: 将来的には、実際のフィードバックに置き換える　*/}
          {feedback}
        </div>
      </div>
      <div className={styles.script_container}>
        <div className={styles.script_icon}>
          <i className="bi bi-chat-left-text-fill" />
        </div>
        <div className={styles.script_text}>
          {/* TODO: 将来的には、実際のスクリプトに置き換える　*/}
          {transcript[pageNum]}
        </div>
      </div>
    </main>
  );
}
