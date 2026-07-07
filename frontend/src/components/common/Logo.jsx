import { MessageCircleMore } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <div
        className="
        w-12
        h-12
        rounded-2xl
        bg-gradient-to-br
        from-violet-600
        to-indigo-600
        flex
        items-center
        justify-center
        shadow-lg
        shadow-violet-600/30
        "
      >
        <MessageCircleMore
          size={26}
          color="white"
        />
      </div>

      <div>
        <h1 className="text-2xl font-black tracking-wide text-white">
          Connecto
        </h1>

        <p className="text-xs text-slate-400">
          AI Messaging Platform
        </p>
      </div>
    </div>
  );
};

export default Logo;