"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type FeedbackTypes = {
  explanation: string;
  logic: string;
  informativeness: string;
  fluency: string;
  question_1: string;
  question_2: string;
  question_3: string;
};

type PageFeedbackTypes = {
  text: string[];
};

// AppContextとして使用する値の型を定義
interface AppContextProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  transcript: string[];
  setTranscript: Dispatch<SetStateAction<string[]>>;
  lapTime: number[];
  setLapTime: Dispatch<SetStateAction<number[]>>;
  feedbacks: FeedbackTypes;
  setFeedbacks: Dispatch<SetStateAction<FeedbackTypes>>;
  pageFeedbacks: PageFeedbackTypes;
  setPageFeedbacks: Dispatch<SetStateAction<PageFeedbackTypes>>;
}

// AppContextを作成
const AppContext = createContext<AppContextProps>({
  file: null,
  setFile: (): File | null => null,
  transcript: [],
  setTranscript: (): string[] => [],
  lapTime: [],
  setLapTime: (): number[] => [],
  feedbacks: {
    explanation: "",
    logic: "",
    informativeness: "",
    fluency: "",
    question_1: "",
    question_2: "",
    question_3: "",
  },
  setFeedbacks: (): FeedbackTypes => ({
    explanation: "",
    logic: "",
    informativeness: "",
    fluency: "",
    question_1: "",
    question_2: "",
    question_3: "",
  }),
  pageFeedbacks: {
    text: [],
  },
  setPageFeedbacks: (): PageFeedbackTypes => ({
    text: [],
  }),
});

// AppContextをProviderでラップする
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 初期値を設定
  const [file, setFile] = useState<File | null>(null);
  const [lapTime, setLapTime] = useState<number[]>([]);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackTypes>({
    explanation: "",
    logic: "",
    informativeness: "",
    fluency: "",
    question_1: "",
    question_2: "",
    question_3: "",
  });
  const [pageFeedbacks, setPageFeedbacks] = useState<PageFeedbackTypes>({
    text: [],
  });

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        lapTime,
        setLapTime,
        transcript,
        setTranscript,
        feedbacks,
        setFeedbacks,
        pageFeedbacks,
        setPageFeedbacks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 各ページやコンポーネントでAppContextを使用するためのカスタムフック
export const useAppContext = () => useContext(AppContext);
