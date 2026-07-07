import { Sparkles } from "lucide-react";
import Tooltip from "../ui/Tooltip";

const FloatingAIButton = ({
  onClick,
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-50">

      <Tooltip
        text="Ask Connecto AI"
        position="left"
      >

        <button
          onClick={onClick}
          className="
            relative

            w-16
            h-16

            rounded-full

            bg-gradient-to-r
            from-violet-600
            via-purple-600
            to-blue-500

            flex
            items-center
            justify-center

            shadow-[0_0_35px_rgba(139,92,246,0.45)]

            hover:scale-110

            active:scale-95

            transition-all
            duration-300

            group
          "
        >

          {/* Glow */}

          <span
            className="
              absolute
              inset-0
              rounded-full
              bg-violet-500
              opacity-30
              blur-xl
              animate-pulse
            "
          />

          {/* Icon */}

          <Sparkles
            size={28}
            className="
              text-white
              relative
              z-10
              group-hover:rotate-12
              transition-transform
              duration-300
            "
          />

        </button>

      </Tooltip>

    </div>
  );
};

export default FloatingAIButton;