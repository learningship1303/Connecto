const Loader = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">

      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-violet-600
          border-t-transparent
          animate-spin
        `}
      />

      {text && (
        <p className="text-slate-400 text-sm">

          {text}

        </p>
      )}

    </div>
  );
};

export default Loader;