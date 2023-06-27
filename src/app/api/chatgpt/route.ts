import { Configuration, OpenAIApi } from "openai";

const header = `
以下に示すプレゼンテーションに対し、良い点と改善案をそれぞれ教えていただきたいです。そのための方針として、
・伝わりやすい説明か、正しい説明か、説明に足りない点や不要な点はないか
・論理展開におかしい点はないか、論理展開はスムーズか
・情報は多すぎないか、また少なすぎないか
・口調に問題はないか
を意識してください。
`;

const format = `
出力形式は以下のように、回答を""で囲うようにしてください。また、可能であれば回答には改善案を含めてください。

{
explanation: "",
logic: "",
informativaness: "",
fluency: "",
}
`;

const testPresentation = `
これから「ジュゴンとマナティーの違いについて」のプレゼンテーションを開始します。
まず、それぞれの動物について説明していきます。その後で、ジュゴンとマナティーの写真をお見せしますね。
さて、ジュゴンはクジラ目に属する海棲哺乳類です。体長は約四十～六十センチメートル。尾びれには大きな扇形の白い斑点があります。鼻孔から口にかけて、長く伸びる黒い筋があるのが特徴です。この黒い線は側線といい、ジュゴンやマナティはこの線に沿って泳ぐことができます。
ジュゴンは主に亜熱帯の海に生息しています。群れをつくって生活し、数頭で一緒に行動することも多いようです。単独行動をとることもありますが、餌を獲る際には仲間の助けを借りることが多いそうです。また、海藻を食べるため、プランクトンを捕食する他のクジラ類とは生態が大きく異なります。そのため、食物連鎖の枠組みからも外れていると考えられています。
一方、マナティーもジュゴンと同じくクジラ目に属しています。マナティーは体長約三十五センチメートルの小型の海洋哺乳動物です。体の色は白っぽい灰色で、背中に茶色い斑模様があり、尾びれにも茶色い斑があります。ジュゴンとマナティーの違いは、体の大きさと、鼻先にある一対の小さな突起物の有無です。これは角だと思われがちですが、実際には角ではなく、吻という器官です。吻の先端は鋭く尖っており、ここに獲物を突き刺して捕らえたり、えものを食べたりするのだといわれています。
マナティーは南大西洋の沖合に生息する深海魚食性の海獣です。水深二百メートル以上のところに棲んでいます。主に硬骨魚類を好んで食べることから、かつては鯨食性であったのではないかともいわれていました。しかし現在では、肉食性の傾向が強いと考えられているのです。
ジュゴンは単独でいることが多いのに対し、マナティーはよく群れを作って行動しています。そのため、マナティーが生息する海域へジュゴンが迷い込むこともあるそうです。このような場合、互いに攻撃し合うことはありません。むしろ、ジュゴンの方がマナティーに対して気を使ってしまうほどなのだとか。
それでは、実際に写真を見てみましょう。
こちらはジュゴンの写真です。
こちらがジュゴンですね。
続いて、こちらはマナティーの写真です。
次はマナティーの写真です。最後に、ジュゴンとマナティーを比較した写真をお見せしますね。
このように、見た目は似ているものの、それぞれの特徴は大きく異なることが分かりました。マナティーの方は少し可愛らしい顔をしているような気がしますよね。ちなみに、マナティーの名前の由来は、その顔つきから来ていると言われていますよ。
`;

export async function POST(req: Request) {
  console.log(process.env);
  const prompt = req.body;
  console.log(prompt);
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  console.log(configuration);
  const openai = new OpenAIApi(configuration);
  console.log("start");
  if (!configuration.apiKey) {
    // "OpenAI API key not configured, please follow instructions in README.md"
    console.log("config読み込めてないよ");
    return;
  }
  console.log("config読み込めてるよ");

  try {
    // 設定を諸々のせてAPIとやり取り
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: header,
        },
        {
          role: "system",
          content: format,
        },
        {
          role: "user",
          content: testPresentation,
        },
      ],
      max_tokens: 1000,
    });
    // GPTの返答を取得
    console.log("動いてますよー");
    // 返答確認用
    console.log(completion.data.choices[0].message);
    const message = completion.data.choices[0].message;
    if (message && message.content) {
      const feedbacks = message.content.split('"');
      for (let i = 1; i < feedbacks.length; i += 2) {
        console.log(feedbacks[i]);
      }
    }
    const data = JSON.stringify({
      message: completion.data.choices[0].message?.content,
    });
    return new Response(data);
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}
