import { useState } from "react";

import {
  Sparkles,
  Image,
} from "lucide-react";

import Tooltip from "../ui/Tooltip";

import AttachmentButton from "./AttachmentButton";
import EmojiPickerButton from "./EmojiPickerButton";
import VoiceRecorder from "./VoiceRecorder";
import SendInput from "./SendInput";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend?.(message);

    setMessage("");
  };

  return (
    <div className="bg-slate-950 border-t border-slate-800 px-6 py-5">

      <div
        className="
          flex
          items-center
          gap-3
          bg-slate-900/90
          backdrop-blur-xl
          border
          border-slate-700
          rounded-2xl
          px-4
          py-3
          shadow-xl
        "
      >

        {/* Attachment */}

        <AttachmentButton />

        {/* Image */}

        <Tooltip text="Upload Image">

          <button
            className="
              p-2.5
              rounded-xl
              hover:bg-slate-800
              hover:text-violet-400
              transition-all
            "
          >
            <Image
              size={20}
              className="text-slate-400"
            />
          </button>

        </Tooltip>

        {/* Emoji */}

        <EmojiPickerButton />

        {/* Input */}

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="
            flex-1
            bg-transparent
            outline-none
            text-white
            placeholder:text-slate-500
            text-[15px]
          "
        />

        {/* AI */}

        <Tooltip text="Ask AI">

          <button
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-blue-500
              text-white
              hover:scale-105
              transition-all
              duration-300
            "
          >
            <Sparkles size={16} />
            AI
          </button>

        </Tooltip>

        {/* Voice */}

        <VoiceRecorder />

        {/* Send */}

        <SendInput
          disabled={!message.trim()}
          onClick={handleSend}
        />

      </div>

    </div>
  );
};

export default MessageInput;