import axios from "axios";

import { API_BASE_URL } from "../config/env";

const messagesApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/message`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

messagesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("connecto_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const isSuccessfulMessageResponse = (response) => {
  return response?.status === 200 || response?.status === 201;
};

export const sendMessageToServer = async (messageData) => {
  try {
    return await messagesApi.post("/", messageData);
  } catch (error) {
    console.error(
      "Failed to send message to server:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getMessagesFromServer = async (conversationId) => {
  return messagesApi.get(`/${conversationId}`);
};
