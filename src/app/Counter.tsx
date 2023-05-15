"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const onClickHandler = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div>
        <button onClick={() => onClickHandler()}>カウンター</button>
      </div>
      <div>カウント数: {count}</div>
    </div>
  );
}
