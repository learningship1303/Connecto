import {
  House,
  Bot,
  Users,
  Phone,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Logo from "../common/Logo";
import ProfileCard from "./ProfileCard";
import SidebarHeader from "./SidebarHeader";

import { logoutUser } from "../../redux/authSlice";
import { resetUserState } from "../../redux/userSlice";
import { resetConversationState } from "../../redux/conversationSlice";
import { resetMessageState } from "../../redux/messageSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Home",
      icon: House,
      path: "/",
    },
    {
      title: "AI Assistant",
      icon: Bot,
      path: "/ai",
    },
    {
      title: "Groups",
      icon: Users,
      path: "/groups",
    },
    {
      title: "Calls",
      icon: Phone,
      path: "/calls",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      dispatch(resetUserState());
      dispatch(resetConversationState());
      dispatch(resetMessageState());

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };

  return (
    <aside
      className="
        w-72
        h-screen
        bg-slate-950
        border-r
        border-slate-800
        flex
        flex-col
        px-5
        py-6
      "
    >
      {/* Logo */}
      <Logo />

      {/* Profile */}
      <div className="mt-8">
        <ProfileCard />
      </div>

      {/* Header / Search */}
      <div className="mt-8">
        <SidebarHeader />
      </div>

      {/* Navigation */}
      <div className="flex-1 mt-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-violet-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }
                `
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          mt-5
          flex
          items-center
          gap-4
          rounded-xl
          px-4
          py-3
          text-red-400
          hover:bg-red-500/10
          transition
        "
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;