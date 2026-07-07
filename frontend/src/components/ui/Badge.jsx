const Badge = ({
  children,
  color = "violet",
  size = "md",
  rounded = true,
  className = "",
}) => {
  const colors = {
    violet: "bg-violet-600 text-white",
    blue: "bg-blue-600 text-white",
    red: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
    yellow: "bg-yellow-500 text-black",
    gray: "bg-slate-700 text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        font-semibold
        whitespace-nowrap
        shadow-md
        transition-all
        duration-300

        ${colors[color]}
        ${sizes[size]}
        ${rounded ? "rounded-full" : "rounded-lg"}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;