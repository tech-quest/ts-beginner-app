import { useEffect } from 'react';

import { useFetchMemosApi } from '~/features/memo/hooks/use-fetch-memos-api';

export const useFetchMemos = () => {
  const { memos, error, isLoading, query } = useFetchMemosApi();

  useEffect(() => {
    query();
  }, []);

  return { memos, fetchError: error, isLoading, refetch: query };
};
