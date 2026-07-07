import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Users,
  Search,
  Plus,
  Hash,
  Lock,
  Globe,
  ArrowRight,
} from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Placement Preparation",
    members: "2.4K Members",
    type: "Public",
    color: "bg-violet-600",
  },
  {
    id: 2,
    name: "AI Enthusiasts",
    members: "980 Members",
    type: "Public",
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "Full Stack Developers",
    members: "1.8K Members",
    type: "Private",
    color: "bg-green-600",
  },
  {
    id: 4,
    name: "System Design",
    members: "640 Members",
    type: "Public",
    color: "bg-orange-600",
  },
  {
    id: 5,
    name: "College Friends",
    members: "42 Members",
    type: "Private",
    color: "bg-pink-600",
  },
  {
    id: 6,
    name: "Movie Club",
    members: "312 Members",
    type: "Public",
    color: "bg-cyan-600",
  },
];

const Groups = () => {
  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

          <div>

            <h1 className="text-4xl font-bold text-white flex items-center gap-3">

              <Users className="text-violet-400" />

              Communities

            </h1>

            <p className="text-slate-400 mt-2">

              Join communities, collaborate and connect with people having similar interests.

            </p>

          </div>

          <Button>

            <div className="flex items-center justify-center gap-2">

              <Plus size={18} />

              Create Group

            </div>

          </Button>

        </div>

        {/* Search */}

        <Card className="mb-10">

          <div className="relative">

            <Search
              className="absolute left-4 top-4 text-slate-500"
              size={20}
            />

            <input
              type="text"
              placeholder="Search groups..."
              className="
              w-full
              bg-slate-900
              border
              border-slate-700
              rounded-xl
              py-4
              pl-12
              pr-4
              text-white
              outline-none
              focus:border-violet-500
              "
            />

          </div>

        </Card>

        {/* Groups */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {groups.map((group) => (

            <Card
              key={group.id}
              hover
              className="cursor-pointer"
            >

              <div className="flex justify-between items-start">

                <div
                  className={`
                  w-16
                  h-16
                  rounded-2xl
                  ${group.color}
                  flex
                  items-center
                  justify-center
                  `}
                >

                  <Hash size={28} color="white" />

                </div>

                {group.type === "Public" ? (
                  <Globe className="text-green-400" />
                ) : (
                  <Lock className="text-orange-400" />
                )}

              </div>

              <h2 className="text-2xl font-bold text-white mt-6">

                {group.name}

              </h2>

              <p className="text-slate-400 mt-3">

                {group.members}

              </p>

              <div className="flex justify-between items-center mt-8">

                <span
                  className="
                  px-4
                  py-1
                  rounded-full
                  bg-violet-600/20
                  text-violet-400
                  text-sm
                  "
                >

                  {group.type}

                </span>

                <button
                  className="
                  flex
                  items-center
                  gap-2
                  text-violet-400
                  hover:text-violet-300
                  "
                >

                  Join

                  <ArrowRight size={18} />

                </button>

              </div>

            </Card>

          ))}

        </div>

        {/* Suggested */}

        <Card className="mt-12">

          <h2 className="text-2xl text-white font-bold mb-8">

            Suggested Communities

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <Suggestion
              title="Open Source Contributors"
              members="5.2K"
            />

            <Suggestion
              title="UI/UX Designers"
              members="3.1K"
            />

            <Suggestion
              title="Competitive Programmers"
              members="8.8K"
            />

          </div>

        </Card>

      </div>

    </div>
    </MainLayout>
  );
};

const Suggestion = ({ title, members }) => (
  <div
    className="
    bg-slate-900
    rounded-2xl
    p-6
    border
    border-slate-800
    hover:border-violet-500
    transition
    "
  >

    <h3 className="text-white text-lg font-semibold">

      {title}

    </h3>

    <p className="text-slate-400 mt-2">

      {members} Members

    </p>

    <button
      className="
      mt-6
      bg-violet-600
      hover:bg-violet-700
      px-5
      py-2
      rounded-lg
      text-white
      "
    >

      Join Community

    </button>

  </div>
);

export default Groups;