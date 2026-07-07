import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  MessageSquare,
  Users,
  UserPlus,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Profile = () => {
  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-950 px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* Cover */}

        <div className="relative h-72 rounded-3xl overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600"
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <button
            className="
            absolute
            top-6
            right-6
            bg-violet-600
            hover:bg-violet-700
            p-3
            rounded-full
            "
          >
            <Camera size={18} color="white" />
          </button>
        </div>

        {/* Profile */}

        <div className="-mt-20 px-10">

          <div className="flex flex-col lg:flex-row gap-10 items-center">

            <div className="relative">

              <img
                src="https://i.pravatar.cc/300"
                alt=""
                className="
                w-40
                h-40
                rounded-full
                border-4
                border-slate-950
                object-cover
                "
              />

              <button
                className="
                absolute
                bottom-2
                right-2
                bg-violet-600
                p-3
                rounded-full
                "
              >
                <Camera size={18} />
              </button>

            </div>

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-white">

                Adhya Singh

              </h1>

              <p className="text-violet-400 mt-2">

                Full Stack Developer • AI Enthusiast

              </p>

              <p className="text-slate-400 mt-4 max-w-3xl">

                Passionate about building scalable web
                applications, AI-powered software,
                collaborative platforms and beautiful UI/UX.
                Love solving DSA and System Design problems.

              </p>

              <div className="flex gap-4 mt-6 flex-wrap">

                <Button>
                  Edit Profile
                </Button>

                <Button variant="outline">
                  Share Profile
                </Button>

              </div>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <Card hover>

            <div className="text-center">

              <MessageSquare
                className="mx-auto text-violet-400"
              />

              <h2 className="text-3xl text-white font-bold mt-4">
                1.2K
              </h2>

              <p className="text-slate-400">
                Messages
              </p>

            </div>

          </Card>

          <Card hover>

            <div className="text-center">

              <Users
                className="mx-auto text-violet-400"
              />

              <h2 className="text-3xl text-white font-bold mt-4">
                285
              </h2>

              <p className="text-slate-400">
                Friends
              </p>

            </div>

          </Card>

          <Card hover>

            <div className="text-center">

              <UserPlus
                className="mx-auto text-violet-400"
              />

              <h2 className="text-3xl text-white font-bold mt-4">
                14
              </h2>

              <p className="text-slate-400">
                Groups
              </p>

            </div>

          </Card>

          <Card hover>

            <div className="text-center">

              <Briefcase
                className="mx-auto text-violet-400"
              />

              <h2 className="text-3xl text-white font-bold mt-4">
                12
              </h2>

              <p className="text-slate-400">
                Projects
              </p>

            </div>

          </Card>

        </div>

        {/* Information */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <Card>

            <h2 className="text-2xl font-bold text-white mb-6">

              Personal Information

            </h2>

            <div className="space-y-5">

              <Info
                icon={<Mail />}
                title="Email"
                value="adhya@gmail.com"
              />

              <Info
                icon={<Phone />}
                title="Phone"
                value="+91 XXXXX XXXXX"
              />

              <Info
                icon={<MapPin />}
                title="Location"
                value="Bhopal, India"
              />

              <Info
                icon={<Calendar />}
                title="Joined"
                value="June 2026"
              />

            </div>

          </Card>

          <Card>

            <h2 className="text-2xl font-bold text-white mb-6">

              Social Links

            </h2>

            <div className="space-y-5">

              <Info
  icon={<FaGithub size={20} />}
  title="GitHub"
  value="github.com/learningship1303"
/>

              <Info
  icon={<FaLinkedin size={20} />}
  title="LinkedIn"
  value="linkedin.com/in/adhya"
/>

              <Info
                icon={<Globe />}
                title="Portfolio"
                value="connecto.app"
              />

            </div>

          </Card>

        </div>

        {/* Skills */}

        <Card className="mt-10">

          <h2 className="text-2xl font-bold text-white mb-6">

            Skills

          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "React",
              "Node.js",
              "MongoDB",
              "Express",
              "Socket.IO",
              "Redux",
              "Tailwind",
              "AI",
              "Docker",
              "Java",
              "C++",
              "System Design",
            ].map((skill) => (

              <span
                key={skill}
                className="
                px-5
                py-2
                rounded-full
                bg-violet-600/20
                border
                border-violet-500/40
                text-violet-300
                "
              >
                {skill}
              </span>

            ))}

          </div>

        </Card>

      </div>

    </div>
    </MainLayout>
  );
};

const Info = ({ icon, title, value }) => (
  <div className="flex items-center gap-4">

    <div className="text-violet-400">

      {icon}

    </div>

    <div>

      <p className="text-slate-400 text-sm">

        {title}

      </p>

      <p className="text-white">

        {value}

      </p>

    </div>

  </div>
);

export default Profile;