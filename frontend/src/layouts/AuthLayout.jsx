import Logo from "../components/common/Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyan-600/20 blur-[140px]" />

      {/* Main Content */}

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

        {/* Left Panel */}

        <div className="hidden lg:flex flex-col justify-center px-20">

          <Logo />

          <h1 className="mt-12 text-6xl font-black text-white leading-tight">

            Welcome to

            <span className="text-violet-400">

              {" "}Connecto

            </span>

          </h1>

          <p className="mt-8 text-slate-400 text-lg leading-8">

            The next-generation AI powered messaging platform
            for chatting, calling, collaborating and building
            communities.

          </p>

          <div className="grid grid-cols-2 gap-6 mt-14">

            <Feature
              title="AI Assistant"
              desc="Rewrite, summarize & translate."
            />

            <Feature
              title="Voice & Video"
              desc="Crystal clear meetings."
            />

            <Feature
              title="Communities"
              desc="Join groups with ease."
            />

            <Feature
              title="End-to-End Security"
              desc="Private and secure."
            />

          </div>

        </div>

        {/* Right Panel */}

        <div className="flex justify-center items-center p-8">

          {children}

        </div>

      </div>

    </div>
  );
};

const Feature = ({ title, desc }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">

    <h3 className="text-lg font-semibold text-white">

      {title}

    </h3>

    <p className="mt-2 text-sm text-slate-400">

      {desc}

    </p>

  </div>
);

export default AuthLayout;