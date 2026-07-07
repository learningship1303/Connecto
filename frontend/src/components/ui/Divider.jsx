const Divider = ({
  text = "",
  className = "",
  color = "bg-slate-700",
  thickness = "h-px",
}) => {
  return (
    <div
      className={`flex items-center gap-4 my-6 ${className}`}
    >
      <div
        className={`flex-1 ${thickness} ${color}`}
      />

      {text && (
        <span
          className="
          whitespace-nowrap
          text-sm
          font-medium
          text-slate-500
          uppercase
          tracking-wider
          "
        >
          {text}
        </span>
      )}

      <div
        className={`flex-1 ${thickness} ${color}`}
      />
    </div>
  );
};

export default Divider;