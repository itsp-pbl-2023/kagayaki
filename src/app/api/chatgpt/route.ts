import { Configuration, OpenAIApi } from "openai";

export async function POST(req: Request) {
  const prompt = await new Response(req.body).text();
  const format = `### 指示 ###\n以下に入力するプレゼンテーションに対する良い点・悪い点をレビューしてください。出力は以下のJSON形式に厳密に沿ってください。\n\n### 出力形式 ###\n{"logic": "{ここに論理性の良さと悪さについて返答を記入}", "explanation": "{ここに内容の説明の良さと悪さについて返答を記入}, "informativeness": "{ここに情報量の良さと悪さについて返答を記入}", "fluency": "{ここに口調の良さと悪さについて返答を記入}", "question_1": "{ここに発表に対する想定質問1を記入}", "question_2": "{ここに発表に対する想定質問2を記入}", "question_3": "{ここに発表に対する想定質問3を記入}"}\n\n### 出力例 ###\n'{"logic": "論理性は高いです。富士山が日本で一番でかい山であり、エベレストが2番目に大きい山という事実に基づいています。また、私が富士山よりもエベレストの方が好きだという主観的な意見も述べられていますが、それについての理由が明確には述べられていません。", "explanation": "内容の説明は中程度です。富士山とエベレストがそれぞれ日本と世界で有名な山であるという事実は述べられていますが、富士山とエベレストの特徴や魅力、なぜエベレストの方が好きなのかについての詳細な説明がないため、内容の充実度はあまり高くないです。", "informativeness": "情報量は低いです。富士山とエベレストがそれぞれ日本で一番でかい山と2番目に大きい山であるという情報は伝えられていますが、それ以外の詳細な情報や裏付けるデータなどは提供されていません。", "fluency": "流暢性は高いです。簡潔な文章でまとまっており、明瞭に意見が表現されています。", "question_1": "富士山が日本一大きな山であるというデータはどこで入手できるのでしょうか？", "question_2": "富士山が日本一大きな山であるというデータはどこで入手できるのでしょうか？", "question_3": "富士山が日本一大きな山であるというデータはどこで入手できるのでしょうか？"}\n\n### 入力 ###\n`;

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  if (!configuration.apiKey) {
    // "OpenAI API key not configured, please follow instructions in README.md"
    return;
  }

  try {
    // 設定を諸々のせてAPIとやり取り
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: format + prompt,
        },
      ],
    });
    // GPTの返答を取得
    const data = JSON.stringify({
      message: completion.data.choices[0].message?.content,
    });
    console.log(data, new Response(data));
    return new Response(data);
  } catch (error: any) {}
}
