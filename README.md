# reading-management-front
作成した読書管理アプリのフロントエンドです。  
バックエンドのコードはhttps://github.com/gaku101/reading-management からご確認できます。  

### 主な機能
- 読書記録の作成・閲覧・削除
- Google Books APIを利用した書籍情報の検索 & 読書記録作成
- 読書記録にノート(メモ)を追加・編集
- 読書記録に読んだページ数を登録
- 読書記録にカテゴリーを追加
- 読書記録にコメントを追加
- 読書記録をお気に入りに追加(⭐️ボタン押下)
- ユーザーのフォロー
- ユーザーのサインアップ・サインイン
- ユーザーの削除
- ポイントの獲得、他ユーザーへの送付
- 獲得ポイントに基づくランク制度(プロフィールで現在のランクを確認)
- プロフィール画像の変更(デプロイ環境でのバグを修正中)

＊現在その他機能追加やバグ修正、レスポンシブ対応などを行なっています。

## バージョン情報

- node v14.18.1
- yarn v1.22.10
- Nuxt ^2.15.7
- tailwind ^4.2.0

---

## 使用技術

- TypeScript  
  https://ja.nuxtjs.org/guide/typescript/
- Composition API  
  https://composition-api.vuejs.org/
- @nuxtjs/composition-api
  https://composition-api.nuxtjs.org/#api-reference

---

## Usage

### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

---

## ディレクトリ構成

```
@
├─ .github
├─ .nuxt
├─ assets
├─ components
│   ├─ buttons
│   ├─ cards
│   ├─ dialogs
│   ├─ inputs
│   └─ ...
├─ layouts
├─ middleware
├─ pages
├─ plugins
├─ static
├─ store
├─ types  // 型情報
├─ utils // 共通関数
├─ .babelrc
├─ .editorconfig
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ jest.config.js
├─ jsconfig.json
├─ nuxt.config.ts
├─ package.json
├─ README.md
├─ tsconfig.json
└─ yarn.lock
```
