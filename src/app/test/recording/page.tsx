//参考にした↓
//https://zenn.dev/hathle/books/next-supabase-voice-book/viewer/04_recorder
//https://www.npmjs.com/package/mic-recorder-to-mp3
//https://unpkg.com/browse/@heroicons/react@2.0.18/24/outline/

"use client";

import styles from "./page.module.css";
import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
const MicRecorder = require("mic-recorder-to-mp3");

// 新規投稿
const PostNew = () => {
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recorder = useRef<typeof MicRecorder>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const { seconds, minutes, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    // インスタンス作成
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  // 音声録音開始
  const startRecording = async () => {
    // ストップウォッチ開始
    reset();
    // 録音開始
    await recorder.current
      .start()
      .then(() => {
        setRecording(true);
      })
      .catch((error: string) => {
        console.error(error);
      });
  };
  // 音声録音停止
  const stopRecording = async () => {
    // ストップウォッチ停止
    pause();
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
        setLoading(true);
        setAudioFile(file);
      })
      .catch((error: string) => {
        setLoading(false);
      });

    // 録音停止
    setRecording(false);
  };

  //音声再生
  const playAudio = async () => {
    //再生
    const audioURL = URL.createObjectURL(audioFile as File);
    const player = new Audio(audioURL);
    player.play();
  };

  //データ送信
  useEffect(() => {
    const fn = async () => {
      try {
        if (audioFile) {
          // 送信データ
          const formData = new FormData();
          formData.append("file", audioFile as File);

          // Whisper API
          const response = await fetch(`/api/whisper/`, {
            method: "POST",
            body: formData,
          });
          const response_data = await response.json();

          // 音声認識チェック
          if (response_data.transcript) {
            setTranscript(response_data.transcript);
          }
        }
      } catch (error) {
        alert(error);
        setLoading(false);
      }
      setAudioFile(null);
    };

    fn();
  }, [audioFile]);

  //whisperからテキストが返ってきたとき
  useEffect(() => {
    if (transcript) {
      // 送信
      //文字起こし後の実装
    } else {
      setLoading(false);
    }
  }, [transcript]);

  return (
    <main className={styles.main}>
      <div>ここは録音のテストページです。</div>
      {loading ? (
        <div>
          <div>
            <button>ボタン</button>
          </div>
          <div>
            <span>{("0" + minutes).slice(-2)}</span>:
            <span>{("0" + seconds).slice(-2)}</span>
          </div>
          <div>
            <button onClick={playAudio}>再生</button>
          </div>
        </div>
      ) : recording ? (
        <div>
          <div>
            <button onClick={stopRecording}>録音停止</button>
          </div>
          <div>
            <span>{("0" + minutes).slice(-2)}</span>:
            <span>{("0" + seconds).slice(-2)}</span>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={startRecording}>録音開始</button>
          </div>
          <div>00:00</div>
        </div>
      )}
      {transcript ? (
        <div>今日のお前の名言にゃ！『{transcript}』</div>
      ) : (
        <div>早く録音するにゃーん</div>
      )}
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
};

export default PostNew;
