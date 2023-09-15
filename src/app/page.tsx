'use client';

import Link from 'next/link';

import { useHooks } from './hooks';

export default function HomePage() {
  const { memos, error, isLoading } = useHooks();

  return (
    <section className="page-container">
      <h1>メモ一覧</h1>
      {error && (
        <div className="alert" role="alert">
          {error.message}
        </div>
      )}
      {isLoading ? (
        <div>読み込み中...</div>
      ) : (
        <ul className="memos">
          {memos.map((memo) => (
            <li key={memo.id} className="memo">
              <div className="memo__body">
                <div className="memo__sub">
                  <div className="memo__datetime">{memo.createdAt}</div>
                </div>
                <Link href={`/detail/${memo.id}`} className="memo__content">
                  {memo.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Link href="/create" className="button button--secondary">
          メモを作成する
        </Link>
      </div>
    </section>
  );
}
