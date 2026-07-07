import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const SidebarItem = ({
  icon: Icon,
  title,
  to,
  badge,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        group
        flex
        items-center
        justify-between
        px-4
        py-3
        rounded-2xl
        transition-all
        duration-300
        ${
          isActive
            ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
            : "text-slate-400 hover:bg-slate-900 hover:text-white"
        }
        `
      }
    >
      <div className="flex items-center gap-4">

        <Icon
          size={20}
          className="transition-transform group-hover:scale-110"
        />

        <span className="font-medium">

          {title}

        </span>

      </div>

      <div className="flex items-center gap-2">

        {badge && (
          <span
            className="
            min-w-6
            h-6
            px-2
            rounded-full
            bg-red-500
            text-white
            text-xs
            flex
            items-center
            justify-center
            "
          >
            {badge}
          </span>
        )}

        <ChevronRight
          size={16}
          className="
          opacity-0
          group-hover:opacity-100
          transition
          "
        />

      </div>

    </NavLink>
  );
};

export default SidebarItem;