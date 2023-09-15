import { useFetchMemos } from './use-fetch-memos';

export const useHooks = () => {
  const { memos, fetchError, isLoading } = useFetchMemos();

  return { memos, error: fetchError, isLoading };
};
