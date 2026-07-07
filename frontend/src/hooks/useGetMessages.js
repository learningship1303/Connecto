import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessages } from "../services/messageService";
import {
  setMessages,
  clearMessages,
} from "../redux/messageSlice";

const useGetMessages = (conversationId) => {
  const dispatch = useDispatch();

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId || !selectedConversation) {
        dispatch(clearMessages());
        return;
      }

      try {
        const data = await getMessages(conversationId);

        dispatch(setMessages(data.messages));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [
    conversationId,
    selectedConversation,
    dispatch,
  ]);
};

export default useGetMessages;