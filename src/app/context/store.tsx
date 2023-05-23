"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// Contextとして使用する値の型を定義
interface ContextProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

// Contextを作成
const AppContext = createContext<ContextProps>({
  count: 0,
  setCount: (): number => 0,
  file: null,
  setFile: (): File | null => null,
});

// ContextをProviderでラップする
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  return (
    <AppContext.Provider value={{ count, setCount, file, setFile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
