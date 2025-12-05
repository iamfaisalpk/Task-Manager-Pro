import { useCallback } from 'react';
import { useTasks } from './useTasks';

export const usePagination = () => {
  const { page, pages, limit, loadTasks, updatePagination, filters } = useTasks();

  const loadNextPage = useCallback(() => {
    if (page < pages) {
      updatePagination({ page: page + 1, limit });
      loadTasks({ ...filters, page: page + 1, limit });
    }
  }, [page, pages, limit, loadTasks, updatePagination, filters]);

  return { loadNextPage };
};
