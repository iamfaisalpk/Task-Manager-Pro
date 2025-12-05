import React, { createContext, useReducer } from 'react'

export const TaskContext = createContext()

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
  search: '',
  filter: 'all',
}

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        pagination: action.payload.pagination,
        error: null,
      }
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] }
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t._id === action.payload._id ? action.payload : t)),
      }
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t._id !== action.payload) }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SEARCH':
      return { ...state, search: action.payload, pagination: { ...state.pagination, page: 1 } }
    case 'SET_FILTER':
      return { ...state, filter: action.payload, pagination: { ...state.pagination, page: 1 } }
    case 'SET_PAGE':
      return { ...state, pagination: { ...state.pagination, page: action.payload } }
    default:
      return state
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    search: state.search,
    filter: state.filter,
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setTasks: (tasks, pagination) => dispatch({ type: 'SET_TASKS', payload: { tasks, pagination } }),
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (task) => dispatch({ type: 'UPDATE_TASK', payload: task }),
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setSearch: (search) => dispatch({ type: 'SET_SEARCH', payload: search }),
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: filter }),
    setPage: (page) => dispatch({ type: 'SET_PAGE', payload: page }),
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
