import API from "./api";

// ==========================================
// Get All Users
// ==========================================

export const getAllUsers = async () => {
  const response = await API.get("/user");
  return response.data;
};

// ==========================================
// Search Users
// ==========================================

export const searchUsers = async (query) => {
  const response = await API.get(
    `/user/search?keyword=${query}`
  );

  return response.data;
};

// ==========================================
// Update Profile
// ==========================================

export const updateProfile = async (data) => {
  const response = await API.put(
    "/user/update",
    data
  );

  return response.data;
};