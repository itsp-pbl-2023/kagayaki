import { NextRequest, NextResponse } from "next/server";

type HelloRequest = NextRequest & {
  name: string;
};

export async function GET(req: HelloRequest) {
  /* 実際のAPIではこのような感じでデータを取得する
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });
  const data = await res.json(); 
  */
  const data = { message: `ようこそ！${req.name}さん！` };
  return NextResponse.json(data);
}
