import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Avatar from "../common/Avatar";
import MessageReaction from "./MessageReaction";
import MessageStatus from "./MessageStatus";

const Message = ({ message }) => {
  const messageRef = useRef(null);

  const { user } = useSelector(
    (state) => state.auth
  );

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const isSender =
    message.sender?._id === user?._id;

  const otherUser =
    selectedConversation?.participants?.find(
      (participant) =>
        participant._id !== user?._id
    );

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  return (
    <div
      ref={messageRef}
      className={`flex ${
        isSender
          ? "justify-end"
          : "justify-start"
      } mb-6`}
    >
      <div
        className={`
          flex
          items-end
          gap-3
          max-w-[75%]
          ${
            isSender
              ? "flex-row-reverse"
              : ""
          }
        `}
      >
        {/* Avatar */}

        <Avatar
          image={
            isSender
              ? user?.avatar?.url
              : otherUser?.avatar?.url
          }
          name={
            isSender
              ? user?.fullName
              : otherUser?.fullName
          }
          size="sm"
          online={!isSender}
        />

        {/* Message */}

        <div>
          <div
            className={`
              px-5
              py-3
              rounded-3xl
              shadow-lg
              break-words

              ${
                isSender
                  ? "bg-violet-600 text-white rounded-br-md"
                  : "bg-slate-800 text-white rounded-bl-md"
              }
            `}
          >
            {message.deleted ? (
              <span className="italic opacity-70">
                This message was deleted.
              </span>
            ) : (
              message.text
            )}
          </div>

          {/* Footer */}

          <div
            className={`
              flex
              items-center
              gap-2
              mt-2
              text-xs
              text-slate-500

              ${
                isSender
                  ? "justify-end"
                  : ""
              }
            `}
          >
            <span>
              {new Date(
                message.createdAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            {message.edited && (
              <span>(edited)</span>
            )}

            {isSender && (
              <MessageStatus
                status={
                  message.status || "sent"
                }
              />
            )}
          </div>

          {!message.deleted && (
            <MessageReaction
              message={message}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;