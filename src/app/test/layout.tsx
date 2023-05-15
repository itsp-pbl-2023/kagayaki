export const metadata = {
  title: "test",
  description: "プレゼンテーション練習を支援するアプリケーション",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <h1>ここはテストディレクトリです。</h1>
    </div>
  );
}
