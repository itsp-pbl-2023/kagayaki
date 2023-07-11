"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import PdfView from "@/app/components/PdfViewer";
import Loading from "../components/Loading";
import { OnDocumentLoadSuccess } from "react-pdf/dist/cjs/shared/types";
import { useAppContext } from "../context/store";

const MicRecorder = require("mic-recorder-to-mp3");

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  const [numPages, setNumPages] = useState(0);
  const [timerMinute, setTimerMinute] = useState(0);
  const [timerSecond, setTimerSecond] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const { lapTime, setLapTime, transcript, setTranscript, setFeedbacks } =
    useAppContext();
  const [status, setStatus] = useState(0);

  const recorder = useRef<typeof MicRecorder>(null);

  var num = 0;

  useEffect(() => {
    // インスタンス作成
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  useEffect(() => {
    const fn = async () => {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/api/whisper/`, {
        method: "POST",
        body: formData,
      });
      await response.json().then((response_data) => {
        if (status == 1) {
          setStatus(2);
        }
        setTranscript([...transcript, response_data.transcript]);
      });
    };
    fn();
  }, [file]);

  useEffect(() => {
    if (status == 3) {
      router.push("/feedback");
    } else if (status == 2) {
      chatgptCall().then(() => {
        setStatus(3);
      });
    }
  }, [status]);

  const chatgptCall = async () => {
    var fullText = "";
    for (let i = 0; i < transcript.length; i++) {
      if (i == 0) {
        fullText += transcript[i];
      } else {
        fullText += "\n" + transcript[i];
      }
    }
    console.log(fullText);
    // 非同期処理が完了してレスポンスが取得できたら、data["content"]をfeedbacksに格納
    const res = await fetch(`/api/chatgpt/`, {
      method: "POST",
      body: fullText,
    });
    const data = await res.json();
    setFeedbacks(JSON.parse(data["message"]));
  };

  const startRecording = async () => {
    // 録音開始
    await recorder.current.start().catch((error: string) => {
      console.error(error);
    });
  };

  // 音声録音停止
  const stopRecording = async () => {
    num += 1;
    // 録音停止
    await recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]: any) => {
        // 音声ファイル生成
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        // 録音停止
        setFile(file);
      });
  };

  const startButton = () => {
    setIsStarted(true);
    // 経過時間を表示する
    setLastTime(Date.now());
    const tmp = Date.now();
    setLapTime([]);
    setTranscript([]);
    setInterval(() => {
      const elapsedTime = Date.now() - tmp;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      setTimerMinute(minutes);
      setTimerSecond(seconds);
    }, 10);
    startRecording();
  };

  const nextButton = () => {
    const elapsedTime = Date.now() - lastTime;
    setLastTime(Date.now());
    setLapTime([...lapTime, elapsedTime]);
    setPageNum(pageNum + 1);
    stopRecording();
    startRecording();
  };

  const stopButton = () => {
    const elapsedTime = Date.now() - lastTime;
    setLapTime([...lapTime, elapsedTime]);
    setStatus(1);
    stopRecording();
  };

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <main className={styles.main}>
      {status === 2 && <Loading />}
      <div className={styles.nav_container}>
        <div className={styles.page_text}>
          ページ&nbsp;
          {pageNum} / {numPages}
        </div>
        {isStarted ? (
          <div className={styles.status_text}>
            <i className={"bi bi-record-circle-fill " + styles.on_recording} />
            &nbsp;録音中
          </div>
        ) : (
          <div className={styles.status_text}>
            <i className={"bi bi-stop-fill " + styles.on_waiting} />
            &nbsp;録音待機中
          </div>
        )}
        <div className={styles.timer_text}>
          <i className="bi bi-clock-fill" />
          &nbsp;
          {timerMinute < 10 ? "0" + timerMinute : timerMinute}:
          {timerSecond < 10 ? "0" + timerSecond : timerSecond}
        </div>
      </div>
      <div className={styles.slide_container}>
        <PdfView
          pageNum={pageNum}
          numPages={numPages}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
        />
      </div>
      <div className={styles.button_container}>
        {!isStarted ? (
          <button className={styles.button_start} onClick={() => startButton()}>
            スタート
          </button>
        ) : pageNum < numPages ? (
          <button className={styles.button_next} onClick={() => nextButton()}>
            次のページへ
          </button>
        ) : (
          <button className={styles.button_stop} onClick={() => stopButton()}>
            終了
          </button>
        )}
      </div>
    </main>
  );
}
