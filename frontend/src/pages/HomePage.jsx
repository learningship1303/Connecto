import ChatLayout from "../layouts/ChatLayout";
import ChatList from "../components/sidebar/ChatList";
import MessageContainer from "../components/chat/MessageContainer";

const HomePage = () => {
  return (
    <ChatLayout>
      <div className="h-full flex">

        {/* Conversation List */}

        <div className="w-96 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col">

          <div className="p-6 pb-2">
            <h2 className="text-2xl font-bold text-white">
              Chats
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Your conversations
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <ChatList />
          </div>

        </div>

        {/* Active Conversation */}

        <MessageContainer />

      </div>
    </ChatLayout>
  );
};

export default HomePage;
