import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTasks, setFilters, setPagination, clearTasks } from '../redux/slices/taskSlice';

export const useTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const loadTasks = (params: any) => dispatch(fetchTasks(params));
  const updateFilters = (filters: any) => dispatch(setFilters(filters));
  const updatePagination = (pagination: any) => dispatch(setPagination(pagination));
  const resetTasks = () => dispatch(clearTasks());

  return { ...tasks, loadTasks, updateFilters, updatePagination, resetTasks };
};
