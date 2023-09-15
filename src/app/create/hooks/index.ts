import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCreateMemoApi } from '~/features/memo/hooks/use-create-memo-api';

export const useHooks = () => {
  const router = useRouter();
  const { success, error, isCreating, createMemo } = useCreateMemoApi();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!success) return;
    router.push('/');
  }, [success]);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMemo({ title, content });
  };

  return { error, title, content, isCreating, handleChangeTitle, handleChangeContent, handleSubmit };
};
