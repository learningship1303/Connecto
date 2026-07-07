import API from "./api";

// Get all conversations
export const getConversations = async () => {
  const response = await API.get("/conversation");
  return response.data;
};

// Create conversation
export const createConversation = async (receiverId) => {
  const response = await API.post("/conversation", {
    receiverId,
  });

  return response.data;
};