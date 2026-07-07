export const connectSocket = (socket) => {
  if (!socket || socket.connected) return;

  socket.connect();
};

export const disconnectSocket = (socket) => {
  if (!socket || !socket.connected) return;

  socket.disconnect();
};