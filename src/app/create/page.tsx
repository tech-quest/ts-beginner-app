'use client';

import Link from 'next/link';

import { useHooks } from './hooks';

export default function MemoCreatePage() {
  const { error, title, content, isCreating, handleChangeTitle, handleChangeContent, handleSubmit } = useHooks();

  return (
    <section className="page-container">
      <h1>新規メモ作成</h1>
      <div className="container">
        {error && (
          <div className="alert" role="alert">
            {error.message}
          </div>
        )}
        <div className="panel">
          <div className="panel__body">
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <div className="label">
                  <label htmlFor="title">タイトル</label>
                </div>
                <div className="input">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChangeTitle}
                    className="text-input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="label">
                  <label htmlFor="content">内容</label>
                </div>
                <div className="input">
                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleChangeContent}
                    className="text-input textarea"
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="button button--primary" disabled={isCreating}>
                  {isCreating ? '送信中' : '作成'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Link href="/" className="button">
            一覧に戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
