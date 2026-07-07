import { motion } from "framer-motion";

const Card = ({
  children,

  className = "",

  hover = false,

  animate = true,

  padding = "md",

  bordered = true,

  glow = true,

  onClick,

}) => {

  const paddings = {
    sm: "p-4",

    md: "p-6",

    lg: "p-8",

    xl: "p-10",
  };

  const card = (
    <div
      onClick={onClick}
      className={`
        relative

        overflow-hidden

        rounded-3xl

        ${
          bordered
            ? "border border-white/10"
            : ""
        }

        bg-slate-900/70

        backdrop-blur-2xl

        shadow-[0_8px_40px_rgba(0,0,0,0.45)]

        ${paddings[padding]}

        transition-all

        duration-300

        ${
          hover
            ? "hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(139,92,246,0.35)]"
            : ""
        }

        ${
          onClick
            ? "cursor-pointer"
            : ""
        }

        ${className}
      `}
    >

      {glow && (

        <div
          className="
          absolute
          inset-0

          opacity-20

          bg-gradient-to-br

          from-violet-500

          via-transparent

          to-blue-500

          pointer-events-none
          "
        />

      )}

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
      }}
    >
      {card}
    </motion.div>
  );
};

export default Card;