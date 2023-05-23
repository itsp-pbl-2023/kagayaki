# kagayaki

チーム B のリポジトリです。

## 開発環境構築

`docker-compose.yml`を使用して、Docker で Next.js の開発環境を構築します。

### 初回

```
docker compose build
docker compose up
```

### 2 回目以降

不足しているパッケージは起動時に自動的にインストールされます。

```
docker-compose up
```
