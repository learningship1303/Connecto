import Avatar from "../common/Avatar";

import {
  Settings,
  Edit,
  BadgeCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) return null;

  return (
    <div
      className="
      rounded-2xl
      bg-slate-900
      border
      border-slate-800
      p-5
      transition-all
      duration-300
      hover:border-violet-500
      hover:shadow-lg
      hover:shadow-violet-500/10
      "
    >
      {/* Top */}

      <div className="flex items-center gap-4">

        <Avatar
          name={user.fullName}
          image={user.avatar?.url}
          size="lg"
          online
        />

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h2 className="font-bold text-white text-lg">

              {user.fullName}

            </h2>

            <BadgeCheck
              size={18}
              className="text-blue-400"
            />

          </div>

          <p className="text-green-400 text-sm">

            ● Online

          </p>

          <p className="text-slate-400 text-xs mt-1">

            @{user.username}

          </p>

        </div>

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-2 gap-3 mt-5">

        <button
          onClick={() => navigate("/profile")}
          className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-violet-600
          hover:bg-violet-700
          py-3
          text-white
          transition
          "
        >
          <Edit size={16} />

          Profile
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-slate-800
          hover:bg-slate-700
          py-3
          text-white
          transition
          "
        >
          <Settings size={16} />

          Settings
        </button>

      </div>
    </div>
  );
};

export default ProfileCard;