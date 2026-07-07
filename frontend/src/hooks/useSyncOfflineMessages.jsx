import { useEffect } from "react";

import {
  isSuccessfulMessageResponse,
  sendMessageToServer,
} from "../api/messages";
import db from "../db/db";
import useNetworkStatus from "./useNetworkStatus";

export default function useSyncOfflineMessages() {
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) {
      return undefined;
    }

    let isCancelled = false;

    const syncOfflineMessages = async () => {
      const messages = await db.pendingMessages.toArray();

      if (isCancelled || messages.length === 0) {
        return;
      }

      console.log("Syncing these offline messages to backend:", messages);

      for (const message of messages) {
        try {
          const response = await sendMessageToServer(message);

          if (isSuccessfulMessageResponse(response)) {
            await db.pendingMessages.delete(message.clientMessageId);
          } else {
            console.warn("Offline message sync did not return success:", {
              clientMessageId: message.clientMessageId,
              status: response?.status,
            });
          }
        } catch (error) {
          console.error("Offline message sync failed. Keeping queued:", {
            clientMessageId: message.clientMessageId,
            error,
          });
        }
      }
    };

    syncOfflineMessages();

    return () => {
      isCancelled = true;
    };
  }, [isOnline]);
}
