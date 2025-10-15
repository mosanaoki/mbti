# MBTI診断（Next.js + GSAP）

5問でサクッとタイプを推定する簡易MBTI診断です。Next.js App Router と GSAP を使用しています。

## セットアップ

- Node.js 18+ 推奨
- 依存関係のインストール

```
npm install
```

## 開発サーバー

```
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 構成

- `app/page.tsx` トップページ
- `app/quiz/page.tsx` 診断ページ（GSAPでカード/プログレスをアニメーション）
- `app/result/page.tsx` 結果ページ（クエリ `type` を表示）
- `lib/mbti.ts` 設問とスコアリングロジック
- `app/globals.css` モバイルファーストの基本スタイル

## 使い方の流れ

1. トップから「診断をはじめる」
2. 5問に回答（カードがフェード＆スライド）
3. 自動で `/result?type=XXXX` に遷移して結果を表示

## メモ

- 5問のため精度は簡易版です。設問・重み付けを増やすと精度が上がります。
- GSAP はクライアントコンポーネントでのみ使用しています。
- タイのときは先勝（E/S/T/J を優先）でタイプを組み立てています。

