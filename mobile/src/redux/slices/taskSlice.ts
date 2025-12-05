import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { taskService } from '../../services/taskService';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  list: Task[];
  page: number;
  pages: number;
  limit: number;
  total: number;
  filters: {
    search: string;
    status: string;
    priority: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  list: [],
  page: 1,
  pages: 1,
  limit: 10,
  total: 0,
  filters: {
    search: '',
    status: '',
    priority: '',
  },
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (
    { page, limit, search, status, priority }: { page: number; limit: number; search?: string; status?: string; priority?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await taskService.getTasks({ page, limit, search, status, priority });
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await taskService.createTask(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, payload }: { id: string; payload: any }, { rejectWithValue }) => {
    try {
      const res = await taskService.updateTask(id, payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<{ search?: string; status?: string; priority?: string }>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<{ page: number; limit: number }>) => {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    clearTasks: (state) => {
      state.list = [];
      state.page = 1;
      state.pages = 1;
      state.total = 0;
      state.filters = { search: '', status: '', priority: '' };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.tasks;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.list.unshift(action.payload.task);
        state.total += 1;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.list.findIndex((t) => t._id === action.payload.task._id);
        if (idx !== -1) state.list[idx] = action.payload.task;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { setFilters, setPagination, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
