import API from "./api";

// ==========================================
// Send Message
// ==========================================

export const sendMessage = async (data) => {
  const response = await API.post("/message", data);
  return response.data;
};

// ==========================================
// Get Messages
// ==========================================

export const getMessages = async (conversationId) => {
  const response = await API.get(
    `/message/${conversationId}`
  );

  return response.data;
};

// ==========================================
// Edit Message
// ==========================================

export const editMessage = async (
  messageId,
  text
) => {
  const response = await API.put(
    `/message/${messageId}`,
    { text }
  );

  return response.data;
};

// ==========================================
// Delete Message
// ==========================================

export const deleteMessage = async (
  messageId
) => {
  const response = await API.delete(
    `/message/${messageId}`
  );

  return response.data;
};