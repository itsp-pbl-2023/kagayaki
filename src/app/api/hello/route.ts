export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  /* 実際のAPIではこのような感じでデータを取得する
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });
  const data = await res.json(); 
  */
  const data = JSON.stringify({
    message: `ようこそ！${name}さん！`,
  });
  return new Response(data);
}
