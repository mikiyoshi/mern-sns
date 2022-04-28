# Routing

[React Router DOM](https://v5.reactrouter.com/web/guides/quick-start)

# timeago.js

[timeago.js](https://www.npmjs.com/package/timeago.js/v/4.0.0-beta.3)

```
npm install timeago.js
```

# multer at backend for upload images

[multer](https://www.npmjs.com/package/multer)

```
npm i multer
```

# Redux for Login

- Redux 状態管理
  1. レストランに入る前の状態
     1'. ウェイターは席の案内
  2. レストランに入った後の注文前の状態
     2'. ウェイターは注文を聞く
  3. レストランで食事中の状態
     3'. ウェイターは飲み物の追加を確認
  4. レストランで食事を食べ終えてお会計を済ませた状態
     4'. ウェイターはお皿を片付ける

## Redux image

user input > action > dispatch 通知 > Store / state > reducer 状態管理 > state'

| state = Object              | reducer 状態管理 | state'                   |
| --------------------------- | ---------------- | ------------------------ |
| 1. レストランに入る前の状態 |                  | 1'. ウェイターは席の案内 |
