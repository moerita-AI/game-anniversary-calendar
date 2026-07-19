# スクエニ作品 発売記念日カレンダー

スクウェア・エニックス、旧スクウェア、旧エニックス関連ゲームの発売日と周年を、日本時間で毎日楽しむ非公式ファン向けWebカレンダーです。フェーズ1として、今日の記念日と月間カレンダーを実装しています。公式ロゴ、パッケージ画像、スクリーンショットは使用していません。

## 起動方法

Node.js 22.13以上を用意し、プロジェクトのルートで実行します。

```bash
npm install
npm run dev
```

本番用の確認は次のコマンドです。

```bash
npm run build
npm run start
```

## 現在の機能

- Asia/Tokyo基準の今日の日付と日本語曜日
- 今日と同じ月日の全登録作品、および動的な周年数
- 日曜始まり・前後月の日付を含む42マスの月間カレンダー
- 前月、翌月、今日への移動
- シリーズごとの色、短縮タイトル、最大3作品と「ほかN件」表示
- 日付を押したときの全作品一覧（PCはモーダル、スマートフォンはボトムシート）
- 不正日付と未来の発売データの表示除外
- 320px幅からPCまでのレスポンシブ表示
- キーボードフォーカス、Escで閉じる、aria-currentなどの基本アクセシビリティ
- 作品一覧のシリーズ・ナンバリング／派生絞り込み
- 主要9シリーズのカレンダー表示切り替え
- GitHub Pages用の静的ビルドと基本的なオフライン表示

## GitHub Pagesで公開する

静的サイトだけを確認する場合は次を実行します。

```bash
npm run build:github
npm run preview:github
```

`.github/workflows/deploy-pages.yml` が、`main` ブランチへのpush時にGitHub Pagesへ自動公開します。初回のみ、GitHubリポジトリの **Settings → Pages → Build and deployment** で **GitHub Actions** を選択してください。

## ゲームデータを追加する

ゲームは `app/data/games.ts` の `games` 配列へ追加します。型は `app/types/game.ts` にあります。日付は必ず `YYYY-MM-DD`（例: `1992-12-06`）で記載してください。

必須項目は次のとおりです。

| 項目 | 説明 |
| --- | --- |
| `id` | URLにも使える重複しない英数字ID |
| `title` | 正式タイトル |
| `shortTitle` | カレンダー用短縮名 |
| `seriesId` | `series.ts` に存在するシリーズID |
| `releaseDate` | 掲載対象とする日本発売日、`YYYY-MM-DD` |
| `platform` | ハード名の配列 |
| `region` | `JP` / `NA` / `EU` / `WORLD` |
| `releaseType` | `original` / `port` / `remake` / `remaster` / `mobile` / `arcade` / `collection` |
| `sourceUrls` | 発売日を確認できる情報源URLの配列 |
| `isVisible` | 通常は `true` |

追加例:

```ts
{
  id: "sample-game",
  title: "サンプルゲーム",
  shortTitle: "サンプル",
  seriesId: "other",
  releaseDate: "2000-01-01",
  platform: ["PlayStation"],
  region: "JP",
  releaseType: "original",
  sourceUrls: ["https://example.com/source"],
  searchKeywords: ["さんぷる", "SAMPLE"],
  isVisible: true,
}
```

推測の日付は登録せず、公式商品ページなどで確認してから追加してください。情報源が確認できない作品は、公開データへ入れずTODOとして管理する方針です。

## シリーズと色を追加・変更する

`app/data/series.ts` を編集します。`id` はゲーム側の `seriesId` と一致させます。`color` はライト背景上で識別できる濃さにし、色だけに依存しないよう画面にはシリーズ名または短縮タイトルも常に表示されます。

## 主な構成

```text
app/
  components/       画面部品
  data/             games.ts / series.ts
  types/            データ型
  utils/            日本時間・カレンダー・周年計算
  page.tsx           トップページ
  globals.css        レスポンシブデザイン
public/
  manifest.json      PWAメタデータ
  sw.js              オフライン用サービスワーカー
src/
  main.tsx           GitHub Pages用エントリー
.github/workflows/
  deploy-pages.yml   GitHub Pages自動公開
```

## 主要9シリーズの情報確認

主要9シリーズの確認済み作品と公式情報源は `app/data/majorSeriesVerification.ts` で管理しています。確認内容と掲載判断は `docs/major-series-verification.md` に記録しています。

## 今後の候補

お気に入り、詳細URL、ダークモード、CSV変換、SEO/OGP拡充、Vitest/Testing Libraryによるテスト拡充が候補です。
