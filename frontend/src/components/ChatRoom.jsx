import { useEffect, useRef, useState } from "react";
import { Send, Server, WifiOff } from "lucide-react";

import {
  getMessagesFromServer,
  isSuccessfulMessageResponse,
  sendMessageToServer,
} from "../api/messages";
import { useAuth } from "../context/AuthContext";
import db from "../db/db";
import useNetworkStatus from "../hooks/useNetworkStatus";
import useSocket from "../hooks/useSocket";

const CONVERSATION_ID = "6a4d4fc6739147106cb7df35";

const createClientMessageId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const formatMilitaryTime = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "--:--:-- HRS";
  }

  return `${date.toLocaleTimeString("en-US", {
    hour12: false,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })} HRS`;
};

export default function ChatRoom() {
  const { user } = useAuth();
  const isOnline = useNetworkStatus();
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [queuedCount, setQueuedCount] = useState(0);
  const [sendState, setSendState] = useState("idle");
  const [isSending, setIsSending] = useState(false);

  const appendMessage = (incomingMessage) => {
    setMessages((currentMessages) => {
      const alreadyExists = currentMessages.some((message) => {
        const sameClientMessage =
          message.clientMessageId &&
          incomingMessage.clientMessageId &&
          message.clientMessageId === incomingMessage.clientMessageId;

        const sameMongoMessage =
          message._id && incomingMessage._id && message._id === incomingMessage._id;

        return sameClientMessage || sameMongoMessage;
      });

      if (alreadyExists) {
        return currentMessages;
      }

      return [...currentMessages, incomingMessage];
    });
  };

  useEffect(() => {
    const loadMessageHistory = async () => {
      try {
        const response = await getMessagesFromServer(CONVERSATION_ID);
        setMessages(response.data?.messages || []);
      } catch (error) {
        console.error("Failed to load message history:", error);
      }
    };

    loadMessageHistory();
  }, []);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    socket.emit("joinConversation", CONVERSATION_ID);

    const handleReceiveMessage = (messageData) => {
      appendMessage(messageData);
    };

    const handleTyping = ({ conversationId, userId, fullName }) => {
      if (conversationId !== CONVERSATION_ID || userId === user?._id) {
        return;
      }

      setTypingUser(fullName || "Operator");
    };

    const handleStopTyping = ({ conversationId, userId }) => {
      if (conversationId !== CONVERSATION_ID || userId === user?._id) {
        return;
      }

      setTypingUser("");
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
      socket.emit("stop_typing", {
        conversationId: CONVERSATION_ID,
        userId: user?._id,
        fullName: user?.fullName,
      });
      socket.emit("leaveConversation", CONVERSATION_ID);
    };
  }, [socket, user?._id, user?.fullName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const queueMessage = async (messageObject) => {
    const queuedMessage = {
      ...messageObject,
      status: "QUEUED",
    };

    await db.pendingMessages.put({
      ...queuedMessage,
      status: "pending",
    });

    appendMessage(queuedMessage);
    setQueuedCount(await db.pendingMessages.count());
    setSendState("queued");
  };

  const handleSend = async () => {
    const trimmedText = text.trim();

    if (!trimmedText || isSending || !user?._id) {
      return;
    }

    setIsSending(true);
    socket?.emit("stop_typing", {
      conversationId: CONVERSATION_ID,
      userId: user._id,
      fullName: user.fullName,
    });
    isTypingRef.current = false;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const messageObject = {
      clientMessageId: createClientMessageId(),
      text: trimmedText,
      senderId: user._id,
      conversationId: CONVERSATION_ID,
      timestamp: Date.now(),
      status: "pending",
    };

    try {
      const response = await sendMessageToServer(messageObject);

      if (isSuccessfulMessageResponse(response)) {
        const savedMessage = response.data?.message || {
          ...messageObject,
          status: "sent",
        };

        appendMessage(savedMessage);
        socket?.emit("send_message", {
          ...savedMessage,
          conversationId: CONVERSATION_ID,
        });
        setSendState("sent");
      } else {
        await queueMessage(messageObject);
      }

      setText("");
    } catch (error) {
      console.error("Message send failed. Queuing locally:", error);
      await queueMessage(messageObject);
      setText("");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (event) => {
    const nextText = event.target.value;

    setText(nextText);

    if (!socket || !user?._id) {
      return;
    }

    if (!isTypingRef.current) {
      socket.emit("typing", {
        conversationId: CONVERSATION_ID,
        userId: user._id,
        fullName: user.fullName || "Field Operator",
      });
      isTypingRef.current = true;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        conversationId: CONVERSATION_ID,
        userId: user._id,
        fullName: user.fullName || "Field Operator",
      });
      isTypingRef.current = false;
    }, 1500);
  };

  return (
    <section className="grid min-h-[520px] grid-rows-[1fr_auto] border border-industrial-line bg-industrial-panel">
      <div className="min-h-[340px] overflow-y-auto border-b border-industrial-line bg-industrial-black p-4">
        {messages.length === 0 ? (
          <div className="grid min-h-[300px] place-items-center border border-dashed border-industrial-line text-center">
            <div>
              <div className="font-mono text-xs font-black uppercase text-industrial-muted">
                No messages loaded
              </div>
              <div className="mt-2 text-sm font-bold text-industrial-steel">
                Send a field update to start the live room.
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {messages.map((message) => (
              <article
                key={message.clientMessageId || message._id}
                className="border border-industrial-line bg-industrial-panelAlt p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-mono text-[11px] font-black uppercase text-industrial-amber">
                      {message.sender?.fullName || "Field Operator"}
                    </div>
                    <div className="font-mono text-[11px] font-bold uppercase text-industrial-muted">
                      {formatMilitaryTime(message.createdAt || message.timestamp)}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] uppercase text-industrial-muted">
                    {message.status || "sent"}
                  </div>
                </div>
                <p className="mt-2 break-words text-sm font-semibold text-white">
                  {message.text}
                </p>
              </article>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="bg-industrial-panel p-4">
        <div className="mb-3 flex min-h-10 flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-industrial-muted">
            {isOnline ? (
              <Server className="h-4 w-4 text-industrial-green" />
            ) : (
              <WifiOff className="h-4 w-4 text-industrial-red" />
            )}
            {isOnline ? "API route available" : "Offline queue active"}
          </div>

          {sendState === "queued" && (
            <div className="border border-industrial-amber bg-industrial-amber/10 px-3 py-2 font-mono text-xs font-black uppercase text-industrial-amber">
              QUEUED {queuedCount}
            </div>
          )}

          {sendState === "sent" && (
            <div className="border border-industrial-green bg-industrial-green/10 px-3 py-2 font-mono text-xs font-black uppercase text-industrial-green">
              Saved to MongoDB
            </div>
          )}
        </div>

        {typingUser && (
          <div className="mb-3 animate-pulse font-mono text-xs font-black uppercase text-industrial-green">
            &gt; {typingUser} typing...
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type field update..."
            className="min-h-14 w-full border border-industrial-line bg-industrial-black px-4 font-mono text-sm font-bold text-white outline-none transition placeholder:text-industrial-muted focus:border-industrial-amber"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() || isSending || !user?._id}
            className="flex min-h-14 items-center justify-center gap-3 border border-industrial-amber bg-industrial-amber px-6 font-mono text-sm font-black uppercase text-industrial-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:border-industrial-line disabled:bg-industrial-panelAlt disabled:text-industrial-muted"
          >
            <Send className="h-5 w-5" />
            {isSending ? "Sending" : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}
