import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from '../../services/taskService'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page = 1, limit = 10, search = '', status = 'all' }, { rejectWithValue }) => {
    try {
      const data = await taskService.getTasks(page, limit, search, status)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks')
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const data = await taskService.createTask(taskData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task')
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const data = await taskService.updateTask(id, taskData)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task')
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task')
    }
  }
)

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
  search: '',
  filter: 'all',
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
      state.pagination.page = 1
    },
    setFilter: (state, action) => {
      state.filter = action.payload
      state.pagination.page = 1
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload.tasks
        state.pagination = action.payload.pagination
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks.unshift(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        const index = state.tasks.findIndex((t) => t._id === action.payload._id)
        if (index !== -1) state.tasks[index] = action.payload
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = state.tasks.filter((t) => t._id !== action.payload)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setSearch, setFilter, setPage, clearError } = taskSlice.actions
export default taskSlice.reducer
