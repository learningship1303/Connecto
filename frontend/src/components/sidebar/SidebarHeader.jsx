import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../ui/SearchBar";
import ThemeToggle from "../common/ThemeToggle";

import {
  Bell,
  Plus,
} from "lucide-react";

import {
  setSearchQuery,
} from "../../redux/userSlice";

import {
  searchAllUsers,
} from "../../redux/userSlice";

const SidebarHeader = () => {
  const dispatch = useDispatch();

  const { searchQuery } = useSelector(
    (state) => state.user
  );

  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));

    dispatch(searchAllUsers(value));
  };

  const handleNewChat = () => {
    console.log("Open New Chat Modal");
  };

  const handleNotifications = () => {
    console.log("Notifications");
  };

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Discover
          </h2>

          <p className="text-sm text-slate-400">
            Explore your workspace
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}

          <button
            onClick={handleNotifications}
            className="
              w-10
              h-10
              rounded-xl
              bg-slate-900
              hover:bg-slate-800
              flex
              items-center
              justify-center
              transition
            "
          >
            <Bell
              size={18}
              className="text-slate-300"
            />
          </button>

          {/* New Chat */}

          <button
            onClick={handleNewChat}
            className="
              w-10
              h-10
              rounded-xl
              bg-violet-600
              hover:bg-violet-700
              flex
              items-center
              justify-center
              transition
            "
          >
            <Plus
              size={18}
              color="white"
            />
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* Search */}

      <SearchBar
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SidebarHeader;