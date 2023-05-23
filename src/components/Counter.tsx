"use client";

import { useAppContext } from "@/context/store";

export default function Counter() {
  const { count, setCount } = useAppContext();
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
