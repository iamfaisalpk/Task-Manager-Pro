import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../../services/authService';
import { TOKEN_KEY } from '../../config';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  failedAttempts: number;
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: 'idle',
  error: null,
  failedAttempts: 0,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await authService.login(email, password);
      await AsyncStorage.setItem(TOKEN_KEY, res.token);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { name, email, password }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await authService.register(name, email, password);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const restoreToken = createAsyncThunk(
  'auth/restoreToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error('No token');
      const user = await authService.getProfile(token);
      return { token, user };
    } catch {
      return rejectWithValue('Session expired. Please login again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      state.failedAttempts = 0;
      AsyncStorage.removeItem(TOKEN_KEY);
    },
    clearError: (state: AuthState) => {
      state.error = null;
    },
    incrementFailedAttempts: (state: AuthState) => {
      state.failedAttempts += 1;
    },
    resetFailedAttempts: (state: AuthState) => {
      state.failedAttempts = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        state.failedAttempts = 0;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.failedAttempts += 1;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(restoreToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(restoreToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(restoreToken.rejected, (state, action) => {
        state.status = 'failed';
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, incrementFailedAttempts, resetFailedAttempts } = authSlice.actions;
export default authSlice.reducer;
