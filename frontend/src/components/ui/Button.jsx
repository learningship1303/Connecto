import { Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  onClick,

  variant = "primary",
  size = "md",

  loading = false,
  disabled = false,

  fullWidth = false,

  icon,

  className = "",

  ...props
}) => {
  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/20",

    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white",

    outline:
      "border border-slate-700 bg-transparent hover:bg-slate-800 text-white",

    ghost:
      "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-6 py-3 text-base",

    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        font-semibold

        shadow-lg

        transition-all

        duration-300

        hover:scale-[1.02]

        active:scale-95

        focus:outline-none
        focus:ring-2
        focus:ring-violet-500/40

        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100

        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />

          Loading...
        </>
      ) : (
        <>
          {icon && (
            <span className="flex items-center">
              {icon}
            </span>
          )}

          {children}
        </>
      )}
    </button>
  );
};

export default Button;