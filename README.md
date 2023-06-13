# kagayaki

チーム B のリポジトリです。

## 開発環境構築

`docker-compose.yml`を使用して、Docker で Next.js の開発環境を構築します。

### 初回

```
docker compose build
docker compose run --rm sh -c "npm install"
docker compose up
```

`src/.env.local`に以下の記述が必要です。

```
NEXT_PUBLIC_API_KEY = {APIキーでここを置換}
```

### 2 回目以降（起動のみ）

```
docker compose up
```

### merge や pull で新しいパッケージが必要になったとき

`git merge origin main`、`git pull`などで新しいパッケージが必要となった際は、`npm install`を実行してください。開発時に`Module Not Found`となった場合は、これを行うと解決する可能性が高いです。

```
docker compose run --rm sh -c "npm install"
docker compose up
```

### 新しいパッケージを自分で導入するとき

新機能の実装の際に新しいパッケージが必要となった際は、`npm install`してください。`package.json`が更新されることで、`main`に merge された後に、他の開発者が pull した後、`npm install`で自動的に新しいパッケージもインストールできるようになります。

```
docker compose run --rm sh -c "npm install <package名>"
docker compose up
```

## git 関連

### 自分の作業ブランチの変更をリモートに push する時

```
git add .
git commit -m "<変更内容>"
git push -u origin
```

### 最新の main ブランチを自分の作業ブランチに取り込む時

自分が作業している間に他の人の作業内容が main に merge された場合、自分の作業ブランチにも取り込んだ方がいい場合があります。

```
git fetch
git merge origin main
```

### 最新のブランチの情報を取り込む時

```
git fetch
git pull
```

### 新しい作業ブランチを作る時

基本的には最新の main を pull してから、main から switch するのが良いです。

```
git switch main
git fetch
git pull
git switch -c <新しい作業ブランチ名>
```

## CI/CD・レビューについて

### CI/CD

作業ブランチの `main` への merge を pull request した状態において、作業内容を push すると **GitHub Actions** による **CI/CD** が自動で走るようになっています。CI/CD は以下３種類のものがあります。

- `packages`：必要なパッケージをインストールするジョブです。パッケージが全てインストールできればこのジョブは成功します。
- `lint`：**ESLint** によりコードフォーマットをチェックするジョブです。適切でないコードが含まれている場合、エラーが返ります。
- `build`：Next.js のアプリケーションとして実際にビルドできるかどうかをチェックするジョブです。開発環境では動作していても、不適切なコードが含まれている場合、エラーになる場合があります。

**これら全てのジョブが通るコードになるまで**修正を行なってください。これにより、`main` のコードは常に最低限の品質が保証されるようになり、安全性の高い開発体制が実現します。

### レビュー

pull request の merge には、最低**１人**による**レビュー**（Approve）が必要です。

## 各ディレクトリの説明

### `/app`

実際にルーティングされるページのファイルが入ります。ディレクトリごとに１つのページが生成されます。
それぞれのファイルは次のような役割を持ちます。

- `page.tsx`：そのページの HTML や TypeScript を記述します。
- `page.module.css`：そのページの CSS（スタイリング）を記述します。
- `layout.tsx`：その**ディレクトリ以下のページ全てに共通**する部分を記述します。

`/test`ディレクトリは実験用のページです。何かを試したいときに気軽に使ってください。最終的には廃止します。

### `/app/components`

コンポーネント（UI の部品）は全てここに入れます。ページファイルから `import` して使用する際は以下のようにすると良いです。（`Counter.tsx`の例）
※`@`は`/src`直下のディレクトリを指します。

```
import Counter from "@/app/components/Counter"

export default function Home() {
  return (
    <div>
      <Counter />
    </div>
  );
}
```

### `/app/context`

コンテキストはこのフォルダの`store.tsx`で管理します。全ページ間で共有したい**State**（状態）はここに追加し、`useAppContext()`で読み込みます。
より具体的には以下の手順で新規のコンテキストを追加することができます。

1.  `store.tsx`の`AppContextProps`・`AppContext`・`AppContextProvider`・`AppContext.Provider`に必要な情報を追記する。
2.  コンテキストを読み込みたいページやコンポーネントで以下のようにしてコンテキストを読み込んだり、更新したりする。（`Counter.tsx`の例）

```
import { useAppContext } from "@/app/context/store";

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
```

### `/app/api`

ChatGPT API、Wisper API など非同期処理の部分は全てここに入れます。
参考実装として`/api/hello/route.ts`・`/components/HelloForm.tsx`を追加したので、詳しい仕組みはソースコードを読んでください。

## 注意

ページやコンポーネントにおいて、１つでも`State（状態）`を扱う場合（Context を含む）は、１行目に`"use client";`を追記する必要があります！**サーバーコンポーネント**では State を扱うことができないため、**クライアントコンポーネント**として認識させる必要があるからです。
