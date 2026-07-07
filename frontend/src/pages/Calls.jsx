import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Phone,
  Video,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Search,
  Calendar,
  Clock3,
  Users,
  Plus,
} from "lucide-react";

const calls = [
  {
    id: 1,
    name: "John Carter",
    status: "Incoming",
    time: "Today • 10:30 AM",
    video: false,
  },
  {
    id: 2,
    name: "Emily Watson",
    status: "Outgoing",
    time: "Today • 09:15 AM",
    video: true,
  },
  {
    id: 3,
    name: "Placement Team",
    status: "Missed",
    time: "Yesterday • 8:45 PM",
    video: true,
  },
  {
    id: 4,
    name: "Alex",
    status: "Incoming",
    time: "Yesterday • 4:20 PM",
    video: false,
  },
  {
    id: 5,
    name: "UI Team",
    status: "Outgoing",
    time: "Monday",
    video: true,
  },
];

const Calls = () => {
  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold text-white flex items-center gap-3">

              <Phone className="text-violet-400" />

              Calls

            </h1>

            <p className="text-slate-400 mt-2">

              Manage voice calls, meetings and video conversations.

            </p>

          </div>

          <div className="flex gap-4">

            <Button>

              <Phone size={18} />

              <span className="ml-2">Voice Call</span>

            </Button>

            <Button variant="outline">

              <Video size={18} />

              <span className="ml-2">Video Meeting</span>

            </Button>

          </div>

        </div>

        {/* Search */}

        <Card className="mb-8">

          <div className="relative">

            <Search
              className="absolute left-4 top-4 text-slate-500"
              size={20}
            />

            <input
              placeholder="Search calls..."
              className="w-full bg-slate-900 rounded-xl border border-slate-700 py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500"
            />

          </div>

        </Card>

        {/* Stats */}

        <div className="grid lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Voice Calls"
            value="148"
            icon={<Phone />}
          />

          <StatCard
            title="Video Calls"
            value="63"
            icon={<Video />}
          />

          <StatCard
            title="Meetings"
            value="27"
            icon={<Users />}
          />

          <StatCard
            title="Hours"
            value="89h"
            icon={<Clock3 />}
          />

        </div>

        {/* Upcoming Meeting */}

        <Card className="mb-10">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl text-white font-bold">

                Upcoming Meeting

              </h2>

              <p className="text-slate-400 mt-2">

                Connecto Development Sprint

              </p>

              <div className="flex items-center gap-4 mt-4 text-slate-300">

                <Calendar size={18} />

                Tomorrow • 7:00 PM

              </div>

            </div>

            <Button>

              <Plus size={18} />

              <span className="ml-2">

                Join

              </span>

            </Button>

          </div>

        </Card>

        {/* Recent Calls */}

        <Card>

          <h2 className="text-2xl font-bold text-white mb-8">

            Recent Calls

          </h2>

          <div className="space-y-5">

            {calls.map((call) => (

              <CallCard
                key={call.id}
                {...call}
              />

            ))}

          </div>

        </Card>

      </div>

    </div>
    </MainLayout>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Card hover>

    <div className="flex justify-between items-center">

      <div>

        <p className="text-slate-400">

          {title}

        </p>

        <h2 className="text-3xl font-bold text-white mt-3">

          {value}

        </h2>

      </div>

      <div className="text-violet-400">

        {icon}

      </div>

    </div>

  </Card>
);

const CallCard = ({ name, status, time, video }) => {

  const Icon =
    status === "Incoming"
      ? PhoneIncoming
      : status === "Outgoing"
      ? PhoneOutgoing
      : PhoneMissed;

  const color =
    status === "Incoming"
      ? "text-green-400"
      : status === "Outgoing"
      ? "text-blue-400"
      : "text-red-400";

  return (

    <div className="flex justify-between items-center rounded-2xl bg-slate-900 p-5 hover:bg-slate-800 transition">

      <div className="flex items-center gap-5">

        <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg">

          {name.charAt(0)}

        </div>

        <div>

          <h3 className="text-white font-semibold">

            {name}

          </h3>

          <div className="flex items-center gap-2 mt-1">

            <Icon
              size={16}
              className={color}
            />

            <span className="text-slate-400">

              {status}

            </span>

          </div>

          <p className="text-slate-500 text-sm mt-1">

            {time}

          </p>

        </div>

      </div>

      <div className="flex gap-3">

        <button className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 flex justify-center items-center">

          <Phone
            size={18}
            className="text-white"
          />

        </button>

        <button className="w-12 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 flex justify-center items-center">

          {video ? (
            <Video
              size={18}
              color="white"
            />
          ) : (
            <Phone
              size={18}
              color="white"
            />
          )}

        </button>

      </div>

    </div>

  );

};

export default Calls;