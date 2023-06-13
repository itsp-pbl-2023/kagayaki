"use client";

import { FileUploader } from "react-drag-drop-files";
import { useAppContext } from "@/app/context/store";
import styles from "./Uploader.module.css";

export default function Uploader() {
  const { file, setFile } = useAppContext();
  // typesは型がArrayなので配列で指定する
  const fileTypes = ["PDF"];
  const handleChange = (file: File) => {
    setFile(file);
  };

  return (
    <div className={styles.uploader}>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      {/*選択ファイル名を表示させる*/}
      <p>{file !== null ? `ファイル名：${file["name"]}` : ""}</p>
    </div>
  );
}
