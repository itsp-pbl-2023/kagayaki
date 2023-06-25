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
};

// AppContextとして使用する値の型を定義
interface AppContextProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  feedbacks: FeedbackTypes;
  setFeedbacks: Dispatch<SetStateAction<FeedbackTypes>>;
}

// AppContextを作成
const AppContext = createContext<AppContextProps>({
  count: 0,
  setCount: (): number => 0,
  file: null,
  setFile: (): File | null => null,
  feedbacks: {
    explanation: "",
    logic: "",
    informativeness: "",
    fluency: "",
  },
  setFeedbacks: (): FeedbackTypes => ({
    explanation: "",
    logic: "",
    informativeness: "",
    fluency: "",
  }),
});

// AppContextをProviderでラップする
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // 初期値を設定
  const [count, setCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackTypes>({
    explanation: "",
    logic: "",
    informativeness: "",
    fluency: "",
  });
  return (
    <AppContext.Provider
      value={{ count, setCount, file, setFile, feedbacks, setFeedbacks }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 各ページやコンポーネントでAppContextを使用するためのカスタムフック
export const useAppContext = () => useContext(AppContext);
