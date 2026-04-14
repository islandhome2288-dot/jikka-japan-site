# Jikka Japan - セットアップ・公開手順

## 📁 ディレクトリ構成

```
jikka-japan/
├── app/
│   ├── globals.css          ← 全体スタイル（Tailwind）
│   ├── layout.tsx           ← ルートレイアウト（フォント・メタデータ）
│   ├── page.tsx             ← ルート（/ja にリダイレクト）
│   └── [lang]/
│       ├── layout.tsx       ← 言語レイアウト（ヘッダー・フッター）
│       ├── page.tsx         ← トップページ ★
│       ├── rooms/page.tsx   ← 客室・設備
│       ├── access/page.tsx  ← アクセス
│       ├── reservation/page.tsx ← 予約
│       ├── faq/page.tsx     ← よくある質問
│       └── contact/page.tsx ← お問い合わせ
├── components/
│   ├── Header.tsx           ← ヘッダー（ナビ・言語切替）
│   ├── Footer.tsx           ← フッター
│   ├── ReservationForm.tsx  ← 予約フォーム（Client Component）
│   └── ContactForm.tsx      ← お問い合わせフォーム
├── lib/
│   ├── i18n.ts              ← 多言語ユーティリティ
│   └── translations/
│       ├── ja.ts            ← 日本語テキスト ★ここを編集
│       └── en.ts            ← 英語テキスト ★ここを編集
├── public/
│   └── images/              ← 写真を配置するフォルダ
│       └── README.md        ← 写真の配置ガイド
├── middleware.ts            ← 言語リダイレクト
├── .env.local.example       ← 環境変数サンプル
└── SETUP.md                 ← このファイル
```

---

## 🚀 Step 1: 初期セットアップ

### 1. Node.js のインストール確認
```bash
node -v  # v18以上が必要
npm -v
```

### 2. パッケージのインストール
```bash
cd jikka-japan
npm install
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:3000` を開いてください。

---

## 📝 Step 2: 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成：

```bash
cp .env.local.example .env.local
```

`.env.local` を開いて、以下の値を設定：

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_FORMSPREE_RESERVATION_ID` | Formspree の予約フォームID |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` | Formspree のお問い合わせフォームID |
| `NEXT_PUBLIC_AIRBNB_URL` | AirbnbのリスティングURL |
| `NEXT_PUBLIC_BOOKING_URL` | Booking.comのプロパティURL |
| `NEXT_PUBLIC_INSTAGRAM_URL` | InstagramのプロフィールURL |

### Formspree の設定方法
1. https://formspree.io でアカウント作成（無料）
2. 「New Form」を作成（予約用・お問い合わせ用の2つ）
3. Form ID（例: `xpzgkqyw`）をコピー
4. `.env.local` に設定

---

## 🖼️ Step 3: 写真の追加

`public/images/` フォルダに写真を配置してください。
詳細は `public/images/README.md` を参照。

写真を配置したら、各ページファイルのコメントを外してください：

**例）`app/[lang]/page.tsx` のヒーロー写真：**
1. `<div className="img-placeholder ...">` ブロックを削除
2. `<Image src="/images/hero.jpg" ...>` のコメント（`//`）を外す

---

## ✏️ Step 4: テキストの修正

テキストはすべて翻訳ファイルに集約されています：
- 日本語: `lib/translations/ja.ts`
- 英語: `lib/translations/en.ts`

### よく変更する箇所

**料金を追加したい場合：**
`ja.ts` に price セクションを追加し、ページで呼び出してください。

**Airbnb/Booking.comのURLを設定：**
`.env.local` の `NEXT_PUBLIC_AIRBNB_URL` を設定。

**連絡先メールを変更：**
Footer.tsx の `info@jikka-japan.com` を実際のアドレスに変更。

---

## 🌐 Step 5: Vercel へのデプロイ（公開）

### 方法A: GitHub + Vercel（推奨）

1. **GitHubにリポジトリを作成**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_NAME/jikka-japan.git
   git push -u origin main
   ```

2. **Vercelにアクセス** → https://vercel.com
   - GitHubでログイン
   - 「New Project」→ リポジトリを選択
   - 環境変数を設定（`.env.local` の内容を入力）
   - 「Deploy」

3. **カスタムドメインを設定**（Vercelダッシュボードから）
   - ドメイン（例: `jikka-japan.com`）を追加
   - DNSレコードを設定

### 方法B: Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 🗺️ Step 6: Google Mapsの埋め込み

1. Google Maps で物件周辺エリアを表示
2. 「共有」→「地図を埋め込む」→ HTMLをコピー
3. `app/[lang]/access/page.tsx` の地図プレースホルダーと置き換え

---

## 📋 公開後のチェックリスト

- [ ] 全ページが正常に表示される
- [ ] 日本語・英語の切替が動作する
- [ ] 予約フォームを送信してメールが届く
- [ ] お問い合わせフォームを送信してメールが届く
- [ ] Airbnb/Booking.comへのリンクが正しい
- [ ] スマホで表示確認（各セクション）
- [ ] Google Search Consoleにサイトを登録
- [ ] OGP画像（ogp.jpg）が正しく表示される
- [ ] SNSリンクが正しい

---

## ➕ 将来的な拡張

### 繁体字・簡体字・韓国語の追加
1. `lib/translations/zh-TW.ts`（繁体字）などを作成
2. `lib/i18n.ts` の `supportedLangs` に追加
3. `middleware.ts` の自動検出ロジックを拡張

### 本格予約エンジンの導入
- **Beds24** → API連携でカレンダー同期可能
- **Smoobu** → OTAとの一元管理
- **Guesty** → 大規模向け

### ブログ機能の追加
- Next.js の MDX対応でブログ記事を追加可能
- 「大阪観光ガイド」「関西空港からのアクセス」など SEO記事を追加

---

## ❓ トラブルシューティング

### npm run dev でエラーが出る
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### フォームが送信できない
- `.env.local` の `FORMSPREE_ID` が設定されているか確認
- `npm run dev` を再起動（環境変数の変更は再起動が必要）
