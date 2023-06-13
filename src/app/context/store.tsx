"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// AppContextとして使用する値の型を定義
interface AppContextProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

// AppContextを作成
const AppContext = createContext<AppContextProps>({
  count: 0,
  setCount: (): number => 0,
  file: null,
  setFile: (): File | null => null,
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
  return (
    <AppContext.Provider value={{ count, setCount, file, setFile }}>
      {children}
    </AppContext.Provider>
  );
};

// 各ページやコンポーネントでAppContextを使用するためのカスタムフック
export const useAppContext = () => useContext(AppContext);
