import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  icon,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,

  disabled = false,
  required = false,
  name,
  autoComplete = "off",

  className = "",

  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className={`space-y-2 ${className}`}>

      {/* Label */}

      {label && (
        <label className="block text-sm font-medium text-slate-300">

          {label}

          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}

        </label>
      )}

      {/* Input */}

      <div
        className={`
          group
          flex
          items-center

          rounded-2xl

          border

          ${
            error
              ? "border-red-500"
              : "border-slate-700"
          }

          bg-slate-900/80

          backdrop-blur-md

          transition-all

          duration-300

          focus-within:border-violet-500

          focus-within:ring-2

          focus-within:ring-violet-500/20

          hover:border-slate-600

          ${
            disabled
              ? "opacity-60 cursor-not-allowed"
              : ""
          }
        `}
      >

        {/* Left Icon */}

        {icon && (
          <div
            className="
              px-4

              text-slate-400

              group-focus-within:text-violet-400

              transition-colors
            "
          >
            {icon}
          </div>
        )}

        {/* Input */}

        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className="
            flex-1

            bg-transparent

            py-4

            pr-4

            text-white

            placeholder:text-slate-500

            outline-none

            disabled:cursor-not-allowed
          "
          {...props}
        />

        {/* Password Toggle */}

        {type === "password" && (

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              px-4

              text-slate-400

              hover:text-white

              transition
            "
          >

            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}

          </button>

        )}

      </div>

      {/* Error */}

      {error && (

        <p className="text-sm text-red-400">

          {error}

        </p>

      )}

    </div>
  );
};

export default Input;