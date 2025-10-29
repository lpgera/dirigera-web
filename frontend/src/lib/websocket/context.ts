import { createContext } from "react";

export interface WebSocketContextType {
  lastMessage: MessageEvent<unknown> | null;
}

export const WebSocketContext = createContext<WebSocketContextType>({
  lastMessage: null,
});
