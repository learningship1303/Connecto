import Dexie from "dexie";

export const db = new Dexie("ConnectoOfflineDB");

db.version(1).stores({
  pendingMessages: "clientMessageId, conversationId, timestamp, status",
});

export default db;
