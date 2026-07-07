import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Bell,
  Moon,
  Shield,
  Lock,
  Globe,
  UserCog,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";

const Settings = () => {
  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-950 px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-2">
          Settings
        </h1>

        <p className="text-slate-400 mb-10">
          Manage your Connecto account and personalize your experience.
        </p>

        <div className="space-y-6">

          <SettingCard
            icon={<UserCog />}
            title="Account"
            description="Update profile information, username and email."
          />

          <SettingCard
            icon={<Bell />}
            title="Notifications"
            description="Manage push notifications, sounds and message alerts."
          />

          <SettingCard
            icon={<Moon />}
            title="Appearance"
            description="Switch between dark mode, themes and chat wallpapers."
          />

          <SettingCard
            icon={<Shield />}
            title="Privacy"
            description="Manage blocked users, profile visibility and permissions."
          />

          <SettingCard
            icon={<Lock />}
            title="Security"
            description="Change password, enable 2FA and manage active sessions."
          />

          <SettingCard
            icon={<Globe />}
            title="Language"
            description="Select your preferred language and region."
          />

        </div>

        {/* Preferences */}

        <Card className="mt-10">

          <h2 className="text-2xl font-bold text-white mb-8">

            Preferences

          </h2>

          <div className="space-y-6">

            <ToggleItem
              title="Dark Mode"
              description="Always use dark appearance."
            />

            <ToggleItem
              title="Desktop Notifications"
              description="Receive notifications even when minimized."
            />

            <ToggleItem
              title="Read Receipts"
              description="Allow people to know when you've read messages."
            />

            <ToggleItem
              title="Typing Indicator"
              description="Show others when you're typing."
            />

            <ToggleItem
              title="Online Status"
              description="Display your online presence."
            />

            <ToggleItem
              title="AI Suggestions"
              description="Enable AI-powered smart replies."
            />

          </div>

        </Card>

        {/* Danger Zone */}

        <Card className="mt-10 border border-red-500/30">

          <h2 className="text-2xl font-bold text-red-400 mb-6">

            Danger Zone

          </h2>

          <div className="flex flex-col gap-5">

            <Button>

              <div className="flex justify-center items-center gap-2">

                <LogOut size={18} />

                Logout

              </div>

            </Button>

            <button
              className="
              w-full
              rounded-xl
              py-4
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
              transition
              flex
              justify-center
              items-center
              gap-2
              "
            >

              <Trash2 size={18} />

              Delete Account

            </button>

          </div>

        </Card>

      </div>

    </div>
    </MainLayout>
  );
};

const SettingCard = ({ icon, title, description }) => (
  <Card
    hover
    className="
    flex
    justify-between
    items-center
    cursor-pointer
    "
  >

    <div className="flex items-center gap-5">

      <div
        className="
        w-14
        h-14
        rounded-2xl
        bg-violet-600/20
        flex
        justify-center
        items-center
        text-violet-400
        "
      >
        {icon}
      </div>

      <div>

        <h3 className="text-xl text-white font-semibold">
          {title}
        </h3>

        <p className="text-slate-400">
          {description}
        </p>

      </div>

    </div>

    <ChevronRight className="text-slate-500" />

  </Card>
);

const ToggleItem = ({ title, description }) => (
  <div
    className="
    flex
    justify-between
    items-center
    py-2
    "
  >

    <div>

      <h3 className="text-white font-medium">
        {title}
      </h3>

      <p className="text-slate-400 text-sm">
        {description}
      </p>

    </div>

    <label className="relative inline-flex items-center cursor-pointer">

      <input
        type="checkbox"
        className="sr-only peer"
      />

      <div
        className="
        w-12
        h-7
        bg-slate-700
        rounded-full
        peer
        peer-checked:bg-violet-600
        after:content-['']
        after:absolute
        after:top-1
        after:left-1
        after:bg-white
        after:rounded-full
        after:h-5
        after:w-5
        after:transition-all
        peer-checked:after:translate-x-5
        "
      ></div>

    </label>

  </div>
);

export default Settings;