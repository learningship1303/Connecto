const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative inline-block">

      {children}

      <span
        className="
        absolute
        hidden
        group-hover:block
        bg-slate-900
        text-white
        text-xs
        px-3
        py-2
        rounded-lg
        left-1/2
        -translate-x-1/2
        mt-2
        whitespace-nowrap
        z-50
        "
      >
        {text}
      </span>

    </div>
  );
};

export default Tooltip;