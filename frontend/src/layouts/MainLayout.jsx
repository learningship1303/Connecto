import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <main className="flex-1 overflow-y-auto">

        {children}

      </main>

    </div>
  );
};

export default MainLayout;