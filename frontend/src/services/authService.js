import API from "./api";

// ================================
// Authentication APIs
// ================================

// Register User
export const signup = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// Login User
export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

// Logout User
export const logout = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

// Get Logged-in User
export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

// ================================
// User APIs
// ================================

// Update Profile
export const updateProfile = async (data) => {
  const response = await API.put("/user/update", data);
  return response.data;
};
