import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";
import conversationReducer from "./conversationSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";
import notificationReducer from "./notificationSlice";
import themeReducer from "./themeSlice";

import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,

  blacklist: [
    "socket",
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,

  user: userReducer,

  conversation: conversationReducer,

  message: messageReducer,

  socket: socketReducer,

  notification: notificationReducer,

  theme: themeReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "socket/setSocket",
        ],

        ignoredPaths: [
          "socket.socket",
        ],
      },
    }),

  devTools: import.meta.env.DEV,
});

export default store;