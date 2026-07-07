import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Tooltip from "../ui/Tooltip";

import { sendMessage } from "../../services/messageService";
import { addMessage } from "../../redux/messageSlice";

const SendInput = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    if (!selectedConversation) return;

    try {
      const data = await sendMessage({
        conversationId: selectedConversation._id,
        text,
      });

      dispatch(addMessage(data.message));

      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        p-5
        border-t
        border-slate-800
        bg-slate-950
      "
    >
      <div className="flex items-center gap-3">

        <input
          type="text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Type a message..."
          className="
            flex-1
            rounded-xl
            bg-slate-900
            border
            border-slate-700
            px-4
            py-3
            text-white
            outline-none
            focus:border-violet-500
            placeholder:text-slate-500
          "
        />

        <Tooltip text="Send">

          <button
            type="submit"
            disabled={!text.trim()}
            className="
              w-12
              h-12
              rounded-xl
              bg-violet-600
              hover:bg-violet-700
              disabled:opacity-40
              transition
              flex
              items-center
              justify-center
            "
          >
            <SendHorizontal
              size={20}
              color="white"
            />
          </button>

        </Tooltip>

      </div>
    </form>
  );
};

export default SendInput;