const reactions = ["❤️", "🔥", "😂", "👍"];

const MessageReaction = () => {
  return (
    <div className="flex gap-2 mt-2">

      {reactions.map((emoji) => (

        <button
          key={emoji}
          className="
          bg-slate-800
          rounded-full
          px-2
          py-1
          hover:scale-110
          transition
          "
        >
          {emoji}
        </button>

      ))}

    </div>
  );
};

export default MessageReaction;