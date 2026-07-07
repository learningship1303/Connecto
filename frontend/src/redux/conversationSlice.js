import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getConversations,
  createConversation,
} from "../services/conversationService";

// ======================================================
// Fetch Conversations
// ======================================================

export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async (_, thunkAPI) => {
    try {
      const data = await getConversations();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch conversations."
      );
    }
  }
);

// ======================================================
// Create Conversation
// ======================================================

export const startConversation = createAsyncThunk(
  "conversation/createConversation",
  async (receiverId, thunkAPI) => {
    try {
      const data = await createConversation(receiverId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create conversation."
      );
    }
  }
);

// ======================================================
// Initial State
// ======================================================

const initialState = {
  conversations: [],

  selectedConversation: null,

  loading: false,

  error: null,
};

// ======================================================
// Slice
// ======================================================

const conversationSlice = createSlice({
  name: "conversation",

  initialState,

  reducers: {
    // ==========================================
    // Selected Conversation
    // ==========================================

    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },

    clearSelectedConversation: (state) => {
      state.selectedConversation = null;
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

    resetConversationState: (state) => {
      state.conversations = [];
      state.selectedConversation = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // Fetch Conversations
      // ==========================================

      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations =
          action.payload.conversations || [];
      })

      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================================
      // Create Conversation
      // ==========================================

      .addCase(startConversation.pending, (state) => {
        state.loading = true;
      })

      .addCase(startConversation.fulfilled, (state, action) => {
        state.loading = false;

        const conversation =
          action.payload.conversation;

        const exists = state.conversations.find(
          (c) => c._id === conversation._id
        );

        if (!exists) {
          state.conversations.unshift(conversation);
        }

        state.selectedConversation = conversation;
      })

      .addCase(startConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedConversation,
  clearSelectedConversation,
  clearError,
  resetConversationState,
} = conversationSlice.actions;

export default conversationSlice.reducer;