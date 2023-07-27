export const allPrompt = `### 指示 ###

以下に入力するプレゼンテーションに対して、以下の項目でレビューしてください。各項目では良い点と改善点をどちらも含めて1つの文章にまとめてください。出力は以下のJSON形式に厳密に従うこと。

### 出力形式 ###

{
  "logic": "**ここに論理性の良い点と改善点について返答を記入**",
  "explanation": "**ここに内容の説明の良い点と改善点について返答を記入**",
  "informativeness": **ここに情報量の良い点と改善点について返答を記入**",
  "fluency": "**ここに口調の良い点と改善点について返答を記入**",
  "question_1": "**ここに発表に対する想定質問1を記入**",
  "question_2": "**ここに発表に対する想定質問2を記入**",
  "question_3": "**ここに発表に対する想定質問3を記入**"
}

### 出力例 ###

{
  "logic": "論理性は高いです。富士山が日本で一番大きい山であり、エベレストが2番目に大きい山という事実に基づいています。また、私が富士山よりもエベレストの方が好きだという主観的な意見も述べられていますが、それについての理由が明確には述べられていません。",
  "explanation": "内容の説明は中程度です。富士山とエベレストがそれぞれ日本と世界で有名な山であるという事実は述べられていますが、富士山とエベレストの特徴や魅力、なぜエベレストの方が好きなのかについての詳細な説明がないため、内容の充実度はあまり高くないです。",
  "informativeness": "情報量は低いです。富士山とエベレストがそれぞれ日本で一番大きい山と2番目に大きい山であるという情報は伝えられていますが、それ以外の詳細な情報や裏付けるデータなどは提供されていません。",
  "fluency": "流暢性は高いです。簡潔な文章でまとまっており、明瞭に意見が表現されています。",
  "question_1": "富士山が日本一大きな山であるというデータはどこで入手できるのでしょうか？",
  "question_2": "富士山が日本一大きな山であるというデータはどこで入手できるのでしょうか？",
  "question_3": "富士山が日本一大きな山であるというデータはどこで入手できるのでしょうか？",
}
  
### 入力 ###

`;

export const pagePrompt = `### 指示 ###
以下に入力するプレゼンテーションの内容をそれぞれのページごとにフィードバックしてください。それぞれ良い点と改善点をどちらも含めて1つの文章にまとめてください。出力は以下のJSON形式に厳密に従い、入力で与えられた全てのページについてレビューすること。

### 出力形式 ###

{
  "text": [ 
            "**ここに ページ 1 についての評価を記入**",
            "**ここに ページ 2 についての評価を記入**",
            "**ここに ページ 3 についての評価を記入**",
            "**ここに ページ 4 についての評価を記入**",
            "**ここに ページ 5 についての評価を記入**",
          ],
}

### 出力例 ###

{
  "text": [
            "プレゼンテーションの内容はとても良くまとまっていて、理解しやすかったです。具体的な例を挙げて説明すると、より良いプレゼンテーションになるでしょう。",
            "プレゼンテーションの内容はとても良くまとまっていて、理解しやすかったです。具体的な例を挙げて説明すると、より良いプレゼンテーションになるでしょう。",
            "プレゼンテーションの内容はとても良くまとまっていて、理解しやすかったです。具体的な例を挙げて説明すると、より良いプレゼンテーションになるでしょう。",
            "プレゼンテーションの内容はとても良くまとまっていて、理解しやすかったです。具体的な例を挙げて説明すると、より良いプレゼンテーションになるでしょう。",
            "プレゼンテーションの内容はとても良くまとまっていて、理解しやすかったです。具体的な例を挙げて説明すると、より良いプレゼンテーションになるでしょう。",
          ],
}

### 入力 ###

`;