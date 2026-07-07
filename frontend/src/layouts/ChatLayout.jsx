import MainLayout from "./MainLayout";

const ChatLayout = ({ children }) => {
  return (
    <MainLayout>

      <div className="h-screen bg-slate-950 overflow-hidden">

        {children}

      </div>

    </MainLayout>
  );
};

export default ChatLayout;