import { PrismaClient } from '@prisma/client';
import express from 'express';

import { applyServerSettings } from './settings';

const app = express();
const port = 8000;

// Middlewares and settings
applyServerSettings(app);

// ↓↓↓ バックエンド処理を記述して実際に開発してみましょう！！

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

const initPrisma = () => {
  if (process.env.NODE_ENV === 'production') return new PrismaClient();

  const db = (global.__db__ = global.__db__ ?? new PrismaClient());
  db.$connect();
  return db;
};

const prisma = initPrisma();

// APIのURL http://localhost:8000/memos
// 作成が完了したら http://localhost:3000 にアクセスして確認してみましょう！
app.get('/memos', async (req, res) => {
  const memos = await prisma.memo.findMany({ orderBy: { createdAt: 'desc' } });

  res.json({ data: memos });
});

// APIのURL http://localhost:8000/memos/detail/1
// 存在しないIDを指定した場合 http://localhost:8000/memos/detail/a -> 404 Not Found
// 作成が完了したら http://localhost:3000/detail/1 にアクセスして確認してみましょう！
app.get('/memos/detail/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(404).json({ error: { message: 'ID 形式が不正な形式となっています' } });
    return;
  }

  const memo = await prisma.memo.findUnique({ where: { id } });
  if (memo === null) {
    res.status(404).json({ error: { message: 'メモが見つかりませんでした' } });
    return;
  }

  res.json({ data: memo });
});

// APIのURL http://localhost:8000/memos/create
// 作成が完了したら http://localhost:3000/create にアクセスして確認してみましょう！
app.post('/memos/create', async (req, res) => {
  const { title, content } = req.body;

  if (title === '') {
    res.status(400).json({ error: { message: 'タイトルまたは内容が未入力です' } });
    return;
  }

  if (content === '') {
    res.status(400).json({ error: { message: 'タイトルまたは内容が未入力です' } });
    return;
  }

  const record = await prisma.memo.create({ data: { title, content } });

  res.json({ data: { id: record.id.toString(10) } });
});

// ↑↑↑ バックエンド処理を記述して実際に開発してみましょう！！

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
