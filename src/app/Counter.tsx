"use client";

import { useContext } from "react";
import { AppContext } from "./layout";

export default function Counter() {
  const { count, setCount } = useContext(AppContext);
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
