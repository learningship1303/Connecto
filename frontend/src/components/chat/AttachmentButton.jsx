import { Paperclip } from "lucide-react";
import Tooltip from "../ui/Tooltip";

const AttachmentButton = ({
  onClick,
  disabled = false,
}) => {
  return (
    <Tooltip text="Attach File">

      <button
        onClick={onClick}
        disabled={disabled}
        className="
          p-2.5
          rounded-xl

          text-slate-400

          hover:bg-slate-800
          hover:text-violet-400

          transition-all
          duration-300

          hover:scale-105

          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <Paperclip size={20} />
      </button>

    </Tooltip>
  );
};

export default AttachmentButton;