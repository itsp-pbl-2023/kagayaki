//参考にした↓
//https://zenn.dev/hathle/books/next-supabase-voice-book/viewer/04_recorder

"use client";

import styles from "./page.module.scss";
import Link from "next/link";

import { KeyboardEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
//import { useSupabase } from '../supabase-provider'
import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/solid";
import { useStopwatch } from "react-timer-hook";
const MicRecorder = require("mic-recorder-to-mp3");

// 新規投稿
const PostNew = () => {
  //const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [transcript, setTranscript] = useState("");
  const recorder = useRef<typeof MicRecorder>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const { seconds, minutes, start, pause, reset } = useStopwatch({
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
        console.log(error);
        setLoading(false);
      });

    // 録音停止
    setRecording(false);
  };

  return (
    <main className={styles.main}>
      <div>ここは録音のテストページです。</div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
};

export default PostNew;
