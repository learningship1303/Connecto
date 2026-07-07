import MainLayout from "../layouts/MainLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import {
  Bot,
  Sparkles,
  Send,
  Languages,
  PenSquare,
  FileText,
  Lightbulb,
  MessageCircle,
} from "lucide-react";

const AI = () => {
  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-white flex items-center gap-3">

              <Bot className="text-violet-400" />

              Connecto AI

            </h1>

            <p className="text-slate-400 mt-2">

              Your intelligent assistant for messaging,
              writing and productivity.

            </p>

          </div>

          <Button>

            New Conversation

          </Button>

        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Left Panel */}

          <div className="space-y-5">

            <FeatureCard
              icon={<Sparkles />}
              title="Smart Reply"
              desc="Generate instant replies."
            />

            <FeatureCard
              icon={<PenSquare />}
              title="Rewrite"
              desc="Rewrite professionally."
            />

            <FeatureCard
              icon={<Languages />}
              title="Translate"
              desc="Translate messages."
            />

            <FeatureCard
              icon={<FileText />}
              title="Summarize"
              desc="Summarize long chats."
            />

            <FeatureCard
              icon={<Lightbulb />}
              title="Ideas"
              desc="Generate creative ideas."
            />

          </div>

          {/* AI Chat */}

          <Card className="lg:col-span-3 h-[720px] flex flex-col">

            <div className="pb-6 border-b border-slate-800">

              <h2 className="text-2xl text-white font-bold">

                AI Conversation

              </h2>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto py-8 space-y-6">

              <AIMessage
                ai
                message="Hello 👋 I'm Connecto AI. How can I help you today?"
              />

              <AIMessage
                message="Rewrite my message professionally."
              />

              <AIMessage
                ai
                message="Sure! Please paste the message and I'll rewrite it in a professional tone."
              />

            </div>

            {/* Input */}

            <div className="border-t border-slate-800 pt-5">

              <div className="flex gap-4">

                <input
                  type="text"
                  placeholder="Ask Connecto AI anything..."
                  className="
                  flex-1
                  bg-slate-900
                  rounded-xl
                  p-4
                  outline-none
                  text-white
                  border
                  border-slate-700
                  focus:border-violet-500
                  "
                />

                <button
                  className="
                  w-14
                  h-14
                  rounded-xl
                  bg-violet-600
                  hover:bg-violet-700
                  flex
                  justify-center
                  items-center
                  "
                >

                  <Send color="white" />

                </button>

              </div>

            </div>

          </Card>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <ActionCard
            title="Summarize Chat"
            desc="Generate a summary of selected messages."
          />

          <ActionCard
            title="Translate Conversation"
            desc="Translate entire chat instantly."
          />

          <ActionCard
            title="Generate Icebreaker"
            desc="AI suggests conversation starters."
          />

          <ActionCard
            title="Meeting Notes"
            desc="Convert chat into structured notes."
          />

        </div>

      </div>

    </div>
    </MainLayout>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <Card
    hover
    className="cursor-pointer"
  >

    <div className="flex items-center gap-4">

      <div
        className="
        w-12
        h-12
        rounded-xl
        bg-violet-600/20
        flex
        items-center
        justify-center
        text-violet-400
        "
      >
        {icon}
      </div>

      <div>

        <h3 className="text-white font-semibold">

          {title}

        </h3>

        <p className="text-slate-400 text-sm">

          {desc}

        </p>

      </div>

    </div>

  </Card>
);

const AIMessage = ({ ai = false, message }) => (
  <div
    className={`flex ${ai ? "justify-start" : "justify-end"}`}
  >

    <div
      className={`
      max-w-xl
      rounded-2xl
      px-5
      py-4
      ${
        ai
          ? "bg-slate-800 text-white"
          : "bg-violet-600 text-white"
      }
      `}
    >

      <div className="flex items-center gap-2 mb-2">

        <MessageCircle size={16} />

        <span className="text-sm font-semibold">

          {ai ? "Connecto AI" : "You"}

        </span>

      </div>

      {message}

    </div>

  </div>
);

const ActionCard = ({ title, desc }) => (
  <Card
    hover
    className="cursor-pointer"
  >

    <h3 className="text-white text-lg font-semibold">

      {title}

    </h3>

    <p className="text-slate-400 mt-3">

      {desc}

    </p>

  </Card>
);

export default AI;