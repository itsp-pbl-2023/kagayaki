//参考にした↓
//https://zenn.dev/hathle/books/next-supabase-voice-book/viewer/04_recorder
//https://www.npmjs.com/package/mic-recorder-to-mp3
//https://unpkg.com/browse/@heroicons/react@2.0.18/24/outline/

"use client";

import styles from "./page.module.scss";
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

  return (
    <main className={styles.main}>
      <div>ここは録音のテストページです。</div>
      <div className="fixed bottom-0 left-2 right-2 h-40 flex flex-col justify-end items-center bg-[#7494C0] pb-5">
        <div className="w-[60px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <StopIcon className="h-7 w-7 text-white" />
              </div>
              <div className="text-white font-bold">
                <span>{("0" + minutes).slice(-2)}</span>:
                <span>{("0" + seconds).slice(-2)}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <PlayIcon className="h-7 w-7 text-white" onClick={playAudio} />
              </div>
            </div>
          ) : recording ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <StopIcon
                  className="h-7 w-7 cursor-pointer text-white"
                  onClick={stopRecording}
                />
              </div>
              <div className="text-white font-bold">
                <span>{("0" + minutes).slice(-2)}</span>:
                <span>{("0" + seconds).slice(-2)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <MicrophoneIcon
                  className="h-7 w-7 cursor-pointer text-gray-700"
                  onClick={startRecording}
                />
              </div>
              <div className="text-white font-bold">00:00</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.link}>
        <Link href="/">ルートページへ</Link>
      </div>
    </main>
  );
};

export default PostNew;
