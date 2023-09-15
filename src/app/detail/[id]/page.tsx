'use client';

import Link from 'next/link';

import { MyMultilineString } from '~/components/multiline-string';

import { useHooks } from './hooks';

type Params = {
  id: string;
};

export default function MemoDetailPage({ params }: { params: Params }) {
  const { memo, error, isLoading } = useHooks(params.id);

  return (
    <section className="page-container">
      <h1>メモ詳細</h1>
      <div className="container">
        {error && (
          <div className="alert" role="alert">
            {error.message}
          </div>
        )}
        {!memo && isLoading && <div>読み込み中...</div>}
        {memo && (
          <div className="panel">
            <div className="panel__body">
              <div className="field">
                <div className="label">タイトル</div>
                <div>
                  <MyMultilineString value={memo.title} />
                </div>
              </div>
              <div className="field">
                <div className="label">内容</div>
                <div>
                  <MyMultilineString value={memo.content} />
                </div>
              </div>
              <div className="field">
                <div className="label">作成日時</div>
                <div>{memo.createdAt}</div>
              </div>
              <div className="field">
                <div className="label">更新日時</div>
                <div>{memo.updatedAt}</div>
              </div>
            </div>
          </div>
        )}
        <div>
          <Link href="/" className="button">
            一覧に戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
