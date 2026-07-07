import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllUsers,
  searchUsers,
  updateProfile,
} from "../services/userService";

// ======================================================
// Fetch All Users
// ======================================================

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const data = await getAllUsers();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch users."
      );
    }
  }
);

// ======================================================
// Search Users
// ======================================================

export const searchAllUsers = createAsyncThunk(
  "user/searchUsers",
  async (keyword, thunkAPI) => {
    try {
      const data = await searchUsers(keyword);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Search failed."
      );
    }
  }
);

// ======================================================
// Update Profile
// ======================================================

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const data = await updateProfile(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Profile update failed."
      );
    }
  }
);

// ======================================================
// Initial State
// ======================================================

const initialState = {
  otherUsers: [],

  selectedUser: null,

  onlineUsers: [],

  searchQuery: "",

  friendRequests: [],

  blockedUsers: [],

  loading: false,

  error: null,
};

// ======================================================
// Slice
// ======================================================

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    // ==========================================
    // Selected User
    // ==========================================

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    // ==========================================
    // Online Users
    // ==========================================

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    // ==========================================
    // Search
    // ==========================================

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    clearSearchQuery: (state) => {
      state.searchQuery = "";
    },

    // ==========================================
    // Friend Requests
    // ==========================================

    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },

    // ==========================================
    // Blocked Users
    // ==========================================

    setBlockedUsers: (state, action) => {
      state.blockedUsers = action.payload;
    },

    // ==========================================
    // Error
    // ==========================================

    clearError: (state) => {
      state.error = null;
    },

    // ==========================================
    // Reset
    // ==========================================

    resetUserState: (state) => {
      state.otherUsers = [];
      state.selectedUser = null;
      state.onlineUsers = [];
      state.searchQuery = "";
      state.friendRequests = [];
      state.blockedUsers = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // Fetch Users
      // ==========================================

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUsers = action.payload.users || [];
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Search Users
      // ==========================================

      .addCase(searchAllUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(searchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUsers = action.payload.users || [];
      })

      .addCase(searchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Update Profile
      // ==========================================

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedUser,
  clearSelectedUser,
  setOnlineUsers,
  setSearchQuery,
  clearSearchQuery,
  setFriendRequests,
  setBlockedUsers,
  clearError,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;