import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  login,
  signup,
  logout,
  getCurrentUser,
} from "../services/authService";

// ======================================================
// Register User
// ======================================================

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const data = await signup(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Registration failed."
      );
    }
  }
);

// ======================================================
// Login User
// ======================================================

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const data = await login(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Login failed."
      );
    }
  }
);

// ======================================================
// Logout User
// ======================================================

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const data = await logout();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Logout failed."
      );
    }
  }
);

// ======================================================
// Fetch Current User
// ======================================================

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const data = await getCurrentUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Authentication failed."
      );
    }
  }
);

// ======================================================
// Initial State
// ======================================================

const initialState = {
  user: null,

  isAuthenticated: false,

  loading: false,

  initialized: false,

  error: null,
};

// ======================================================
// Slice
// ======================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.initialized = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // Register
      // ======================================================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload;
      })

      // ======================================================
      // Login
      // ======================================================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload;
      })

      // ======================================================
      // Logout
      // ======================================================

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload;
      })

      // ======================================================
      // Fetch Current User
      // ======================================================

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.initialized = true;
        state.error = null;
      })

      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
        state.error = action.payload || null;
      });
  },
});

export const {
  clearError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;