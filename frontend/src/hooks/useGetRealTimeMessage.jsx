import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addMessage,
} from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();

  const { socket } = useSelector(
    (state) => state.socket
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Ignore messages from other conversations
      if (
        selectedConversation &&
        newMessage.conversation !==
          selectedConversation._id
      ) {
        return;
      }

      dispatch(addMessage(newMessage));
    };

    socket.on(
      "newMessage",
      handleNewMessage
    );

    return () => {
      socket.off(
        "newMessage",
        handleNewMessage
      );
    };
  }, [
    socket,
    selectedConversation,
    dispatch,
  ]);
};

export default useGetRealTimeMessage;