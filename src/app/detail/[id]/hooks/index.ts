import { useFindMemo } from './use-find-memo';

export const useHooks = (id: string) => {
  const { memo, findError, isLoading } = useFindMemo(id);

  return { memo, error: findError, isLoading };
};
