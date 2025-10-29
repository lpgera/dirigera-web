import React, { ReactNode } from "react";
import useWebSocket from "react-use-websocket";
import { useAuthStore } from "@/features/auth";
import { WebSocketContext } from "./context";

const getWebSocketUrl = (token: string | null): string => {
  const { href, protocol, port } = window.location;
  const url = new URL("websocket", href);
  url.protocol = protocol.replace("http", "ws");
  url.port = port;
  url.search = new URLSearchParams({
    token: token ?? "",
  }).toString();
  return url.toString();
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const token = useAuthStore((state) => state.token);
  const { lastMessage } = useWebSocket(
    getWebSocketUrl(token),
    {
      shouldReconnect: () => true,
    },
    Boolean(token)
  );

  return (
    <WebSocketContext.Provider value={{ lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}
