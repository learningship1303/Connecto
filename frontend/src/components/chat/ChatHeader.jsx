import { useSelector } from "react-redux";

import Avatar from "../common/Avatar";
import Tooltip from "../ui/Tooltip";

import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Pin,
  Bell,
  ShieldCheck,
} from "lucide-react";

const ChatHeader = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const { onlineUsers } = useSelector(
    (state) => state.user
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const otherUser = selectedConversation?.participants?.find(
    (participant) => participant._id !== user?._id
  );

  const isOnline = onlineUsers.includes(
    otherUser?._id
  );

  return (
    <header
      className="
      h-24
      px-8
      bg-slate-950/90
      backdrop-blur-xl
      border-b
      border-slate-800
      flex
      items-center
      justify-between
      sticky
      top-0
      z-20
      "
    >
      {/* Left Section */}

      <div className="flex items-center gap-5">

        <Avatar
          name={otherUser?.fullName}
          image={otherUser?.avatar?.url}
          online={isOnline}
          verified
          size="lg"
        />

        <div>

          <div className="flex items-center gap-2">

            <h2 className="text-xl font-bold text-white">

              {otherUser?.fullName}

            </h2>

            <ShieldCheck
              size={18}
              className="text-blue-400"
            />

          </div>

          <p
            className={`text-sm ${
              isOnline
                ? "text-green-400"
                : "text-slate-500"
            }`}
          >

            {isOnline ? "● Online" : "Offline"}

          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-3">

        <Tooltip text="Search Messages">

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            hover:bg-slate-800
            flex
            items-center
            justify-center
            transition
            "
          >
            <Search size={20} className="text-slate-300" />
          </button>

        </Tooltip>

        <Tooltip text="Voice Call">

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            hover:bg-slate-800
            flex
            items-center
            justify-center
            transition
            "
          >
            <Phone size={20} className="text-slate-300" />
          </button>

        </Tooltip>

        <Tooltip text="Video Call">

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-violet-600
            hover:bg-violet-700
            flex
            items-center
            justify-center
            transition
            "
          >
            <Video size={20} color="white" />
          </button>

        </Tooltip>

        <Tooltip text="Pin Conversation">

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            hover:bg-slate-800
            flex
            items-center
            justify-center
            transition
            "
          >
            <Pin size={20} className="text-slate-300" />
          </button>

        </Tooltip>

        <Tooltip text="Mute Notifications">

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            hover:bg-slate-800
            flex
            items-center
            justify-center
            transition
            "
          >
            <Bell size={20} className="text-slate-300" />
          </button>

        </Tooltip>

        <Tooltip text="More">

          <button
            className="
            w-11
            h-11
            rounded-xl
            bg-slate-900
            hover:bg-slate-800
            flex
            items-center
            justify-center
            transition
            "
          >
            <MoreVertical
              size={20}
              className="text-slate-300"
            />
          </button>

        </Tooltip>

      </div>

    </header>
  );
};

export default ChatHeader;