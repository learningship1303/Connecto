import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import ChatDateDivider from "./ChatDateDivider";

import useGetMessages from "../../hooks/useGetMessages";
import useGetRealTimeMessage from "../../hooks/useGetRealTimeMessage";

const Messages = () => {
  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const { messages, typingUsers } = useSelector(
    (state) => state.message
  );

  const typingUser = selectedConversation?.participants?.find(
    (participant) => typingUsers.includes(participant._id)
  );

  // Fetch messages whenever the selected conversation changes
  useGetMessages(selectedConversation?._id);

  // Listen for Socket.IO real-time messages
  useGetRealTimeMessage();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!selectedConversation) {
    return null;
  }

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-8
        py-6
        space-y-4
        bg-gradient-to-b
        from-slate-950
        via-slate-950
        to-slate-900
      "
    >
      <ChatDateDivider date="Today" />

      {messages.length > 0 ? (
        messages.map((message) => (
          <Message
            key={message._id}
            message={message}
          />
        ))
      ) : (
        <div className="flex h-full items-center justify-center">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-slate-300">
              No Messages Yet
            </h2>

            <p className="mt-2 text-slate-500">
              Start the conversation 👋
            </p>

          </div>

        </div>
      )}

      <TypingIndicator
        show={Boolean(typingUser)}
        name={typingUser?.fullName}
      />

      <div ref={bottomRef} />

    </div>
  );
};

export default Messages;