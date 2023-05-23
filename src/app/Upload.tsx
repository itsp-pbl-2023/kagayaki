"use client";

import React, { useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AppContext } from "./layout";

export default function Upload() {
  const { file, setFile } = useContext(AppContext);
  // typesは型がArrayなので配列で指定する
  const fileTypes = ["PDF"];
  const handleChange = (file: File) => {
    setFile(file);
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      {/*選択ファイル名を表示させる*/}
      <p>{file !== null ? `ファイル名：${file["name"]}` : ""}</p>
    </div>
  );
}
