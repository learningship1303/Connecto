import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
      relative
      w-14
      h-8
      rounded-full
      bg-slate-800
      border
      border-slate-700
      transition-all
      duration-300
      hover:border-violet-500
      "
    >
      <div
        className={`
        absolute
        top-1
        w-6
        h-6
        rounded-full
        bg-violet-600
        flex
        items-center
        justify-center
        transition-all
        duration-300
        ${
          dark
            ? "left-1"
            : "left-7"
        }
        `}
      >
        {dark ? (
          <Moon
            size={14}
            className="text-white"
          />
        ) : (
          <Sun
            size={14}
            className="text-yellow-300"
          />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;