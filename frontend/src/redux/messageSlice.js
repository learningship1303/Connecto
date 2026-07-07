import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ==========================================
  // Messages
  // ==========================================

  messages: [],

  // ==========================================
  // Typing Users
  // ==========================================

  typingUsers: [],

  // ==========================================
  // Reply Message (Future)
  // ==========================================

  replyingTo: null,

  // ==========================================
  // UI
  // ==========================================

  loading: false,

  error: null,
};

const messageSlice = createSlice({
  name: "message",

  initialState,

  reducers: {
    // ==========================================
    // Messages
    // ==========================================

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    updateMessage: (state, action) => {
      state.messages = state.messages.map((message) =>
        message._id === action.payload._id
          ? action.payload
          : message
      );
    },

    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    // ==========================================
    // Typing Users
    // ==========================================

    setTypingUsers: (state, action) => {
      state.typingUsers = action.payload;
    },

    addTypingUser: (state, action) => {
      if (
        !state.typingUsers.includes(action.payload)
      ) {
        state.typingUsers.push(action.payload);
      }
    },

    removeTypingUser: (state, action) => {
      state.typingUsers =
        state.typingUsers.filter(
          (id) => id !== action.payload
        );
    },

    // ==========================================
    // Reply Feature
    // ==========================================

    setReplyingTo: (state, action) => {
      state.replyingTo = action.payload;
    },

    clearReplyingTo: (state) => {
      state.replyingTo = null;
    },

    // ==========================================
    // UI
    // ==========================================

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // ==========================================
    // Reset
    // ==========================================

    resetMessageState: (state) => {
      state.messages = [];
      state.typingUsers = [];
      state.replyingTo = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  clearMessages,
  setTypingUsers,
  addTypingUser,
  removeTypingUser,
  setReplyingTo,
  clearReplyingTo,
  setLoading,
  setError,
  clearError,
  resetMessageState,
} = messageSlice.actions;

export default messageSlice.reducer;