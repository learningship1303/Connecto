import Avatar from "../common/Avatar";

const TypingIndicator = ({
  name = "John Carter",
  show = true,
}) => {
  if (!show) return null;

  return (
    <div className="flex items-end gap-3 py-4 animate-fade-in">

      <Avatar
        name={name}
        size="sm"
        online
      />

      <div>

        <p className="text-xs text-slate-500 mb-2">

          {name} is typing...

        </p>

        <div
          className="
          bg-slate-800
          rounded-2xl
          px-5
          py-4
          flex
          items-center
          gap-2
          shadow-lg
          "
        >

          <span
            className="
            w-2
            h-2
            rounded-full
            bg-violet-400
            animate-bounce
            "
          />

          <span
            className="
            w-2
            h-2
            rounded-full
            bg-violet-400
            animate-bounce
            [animation-delay:150ms]
            "
          />

          <span
            className="
            w-2
            h-2
            rounded-full
            bg-violet-400
            animate-bounce
            [animation-delay:300ms]
            "
          />

        </div>

      </div>

    </div>
  );
};

export default TypingIndicator;