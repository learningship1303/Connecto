import { Mic } from "lucide-react";
import Tooltip from "../ui/Tooltip";

const VoiceRecorder = ({
  recording = false,
  onClick,
  disabled = false,
}) => {
  return (
    <Tooltip
      text={
        recording
          ? "Stop Recording"
          : "Voice Message"
      }
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          p-2.5
          rounded-xl

          transition-all
          duration-300

          hover:scale-105

          ${
            recording
              ? "bg-red-500 text-white animate-pulse"
              : "text-slate-400 hover:bg-slate-800 hover:text-red-400"
          }

          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
      >
        <Mic size={20} />
      </button>
    </Tooltip>
  );
};

export default VoiceRecorder;