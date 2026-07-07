const ChatDateDivider = ({
  date = "Today",
}) => {
  return (
    <div className="flex items-center gap-4 my-8">

      <div className="flex-1 h-px bg-slate-800" />

      <span
        className="
          px-4
          py-2
          rounded-full

          bg-slate-900

          border
          border-slate-700

          text-xs
          font-medium
          uppercase
          tracking-wider

          text-slate-400

          shadow-md
        "
      >
        {date}
      </span>

      <div className="flex-1 h-px bg-slate-800" />

    </div>
  );
};

export default ChatDateDivider;