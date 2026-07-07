import { useDispatch, useSelector } from "react-redux";

import Avatar from "../common/Avatar";

import {
  setSelectedConversation,
} from "../../redux/conversationSlice";

import {
  getMessages,
} from "../../services/messageService";

import {
  setMessages,
} from "../../redux/messageSlice";

const ChatItem = ({ conversation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const { onlineUsers } = useSelector(
    (state) => state.user
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  // ==========================================
  // Get Other User
  // ==========================================

  const otherUser = conversation.participants.find(
    (participant) =>
      participant._id !== user._id
  );

  const isOnline = onlineUsers.includes(
    otherUser._id
  );

  const isActive =
    selectedConversation?._id ===
    conversation._id;

  // ==========================================
  // Open Conversation
  // ==========================================

  const openConversation = async () => {
    dispatch(
      setSelectedConversation(conversation)
    );

    try {
      const data = await getMessages(
        conversation._id
      );

      dispatch(setMessages(data.messages));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={openConversation}
      className={`
        flex
        items-center
        justify-between
        p-4
        rounded-2xl
        cursor-pointer
        transition-all
        duration-300

        ${
          isActive
            ? "bg-violet-600"
            : "hover:bg-slate-800"
        }
      `}
    >
      <div className="flex items-center gap-4">
        <Avatar
          name={otherUser.fullName}
          image={otherUser.avatar?.url}
          online={isOnline}
        />

        <div>
          <h3 className="font-semibold text-white">
            {otherUser.fullName}
          </h3>

          <p className="text-sm text-slate-400 truncate w-44">
            {conversation.lastMessage?.text ||
              "Start chatting..."}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs text-slate-400">
          {conversation.lastMessage?.createdAt
            ? new Date(
                conversation.lastMessage.createdAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </span>

        {conversation.unreadCount > 0 && (
          <span
            className="
              mt-2
              bg-violet-500
              rounded-full
              px-2
              text-xs
              text-white
            "
          >
            {conversation.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatItem;