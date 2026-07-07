import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,

  connected: false,

  typingUsers: [],

  notifications: [],
};

const socketSlice = createSlice({
  name: "socket",

  initialState,

  reducers: {

    setSocket: (state, action) => {
      state.socket = action.payload;
    },

    setConnected: (state, action) => {
      state.connected = action.payload;
    },

    setTypingUsers: (state, action) => {
      state.typingUsers = action.payload;
    },

    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    resetSocketState: (state) => {
      state.socket = null;
      state.connected = false;
      state.typingUsers = [];
      state.notifications = [];
    },

  },
});

export const {
  setSocket,
  setConnected,
  setTypingUsers,
  addNotification,
  clearNotifications,
  resetSocketState,
} = socketSlice.actions;

export default socketSlice.reducer;