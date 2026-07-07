const Tooltip = ({
  text,
  children,
  position = "bottom",
}) => {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div className="group relative inline-flex">

      {children}

      <div
        className={`
          absolute
          ${positions[position]}
          z-50

          opacity-0
          invisible

          group-hover:opacity-100
          group-hover:visible

          transition-all
          duration-200

          px-3
          py-2

          rounded-xl

          bg-slate-900
          border
          border-slate-700

          shadow-xl

          whitespace-nowrap

          text-xs
          text-white

          pointer-events-none
        `}
      >
        {text}
      </div>

    </div>
  );
};

export default Tooltip;