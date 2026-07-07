import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatItem from "./ChatItem";

import {
  fetchConversations,
} from "../../redux/conversationSlice";

const ChatList = () => {
  const dispatch = useDispatch();

  const {
    conversations,
    loading,
  } = useSelector(
    (state) => state.conversation
  );

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="mt-8 text-center text-slate-400">
        Loading conversations...
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="mt-8 text-center text-slate-500">
        No conversations yet.
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-6">

      {conversations.map((conversation) => (

        <ChatItem
          key={conversation._id}
          conversation={conversation}
        />

      ))}

    </div>
  );
};

export default ChatList;