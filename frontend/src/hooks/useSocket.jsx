import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { SOCKET_URL } from "../config/env";

export default function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socketInstance.connect();
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, []);

  return socket;
}
