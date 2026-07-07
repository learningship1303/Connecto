const Avatar = ({
  image,
  name = "User",
  size = "md",
  online = false,
  verified = false,
}) => {
  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl",
    xl: "w-28 h-28 text-4xl",
  };

  return (
    <div className="relative inline-block">

      {/* Avatar */}

      {image ? (
        <img
          src={image}
          alt={name}
          className={`
            ${sizes[size]}
            rounded-full
            object-cover
            border-2
            border-slate-700
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
            hover:border-violet-500
          `}
        />
      ) : (
        <div
          className={`
            ${sizes[size]}
            rounded-full
            bg-gradient-to-br
            from-violet-600
            via-indigo-600
            to-blue-500
            flex
            items-center
            justify-center
            font-bold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
          `}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Online Indicator */}

      {online && (
        <span
          className="
          absolute
          bottom-1
          right-1
          w-4
          h-4
          rounded-full
          bg-green-500
          border-2
          border-slate-950
          "
        />
      )}

      {/* Verified Badge */}

      {verified && (
        <span
          className="
          absolute
          -top-1
          -right-1
          w-5
          h-5
          rounded-full
          bg-blue-500
          border-2
          border-slate-950
          flex
          items-center
          justify-center
          text-[10px]
          text-white
          "
        >
          ✓
        </span>
      )}

    </div>
  );
};

export default Avatar;