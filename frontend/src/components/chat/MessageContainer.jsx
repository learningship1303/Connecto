import { useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import SendInput from "./SendInput";

const MessageContainer = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">

            Hi, {user?.fullName} 👋

          </h1>

          <p className="text-slate-400 mt-4">

            Select a conversation to start chatting.

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-slate-900">

      <ChatHeader />

      <Messages />

      <SendInput />

    </div>
  );
};

export default MessageContainer;