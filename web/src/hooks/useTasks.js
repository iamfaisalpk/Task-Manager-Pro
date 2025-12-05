import { useSelector } from 'react-redux'

export const useTasks = () => {
  const { tasks, loading, error, pagination, search, filter } = useSelector((state) => state.tasks)
  return { tasks, loading, error, pagination, search, filter }
}
