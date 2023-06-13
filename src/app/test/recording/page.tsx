//参考にした↓
//https://zenn.dev/hathle/books/next-supabase-voice-book/viewer/04_recorder
//https://www.npmjs.com/package/mic-recorder-to-mp3
//https://unpkg.com/browse/@heroicons/react@2.0.18/24/outline/

"use client";

import styles from "./page.module.css";
import Link from "next/link";

import { KeyboardEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
//import { useSupabase } from '../supabase-provider'
import { MicrophoneIcon, StopIcon, PlayIcon } from "@heroicons/react/24/solid";
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

  //音声再生
  const playAudio = async () => {
    //再生
    const player = new Audio(URL.createObjectURL(audioFile as File));
    player.play();
  };

  //データ送信
  useEffect(() => {
    const fn = async () => {
      try {
        if (audioFile) {
          // 送信データ
          const formData = new FormData();
          formData.append("file", audioFile);

          console.log("whisper start");

          // Whisper API
          const response = await fetch(`/test/api/whisper`, {
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
            <StopIcon />
          </div>
          <div>
            <span>{("0" + minutes).slice(-2)}</span>:
            <span>{("0" + seconds).slice(-2)}</span>
          </div>
          <div>
            <PlayIcon onClick={playAudio} />
          </div>
        </div>
      ) : recording ? (
        <div>
          <div>
            <StopIcon onClick={stopRecording} />
          </div>
          <div>
            <span>{("0" + minutes).slice(-2)}</span>:
            <span>{("0" + seconds).slice(-2)}</span>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <MicrophoneIcon onClick={startRecording} />
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
