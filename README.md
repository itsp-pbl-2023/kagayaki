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
