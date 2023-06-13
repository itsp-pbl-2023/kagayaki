"use client";

import { useState } from "react";

export default function HelloForm() {
  const [name, setName] = useState("");
  const [text, setText] = useState("まだ何もリクエストされていません");
  const handleOnClick = async () => {
    const res = await fetch(`/api/hello?name=${name}`);
    const data = await res.json();
    setText(data.message);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleOnClick}>送信</button>
      <div>{text}</div>
    </div>
  );
}
