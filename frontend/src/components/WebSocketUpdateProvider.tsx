import React, { createContext, ReactElement, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { AuthContext } from "./AuthContext";

const WebSocketUpdateContext = createContext<{
  lastMessage: MessageEvent<any> | null;
}>({
  lastMessage: null,
});

const wsUrl = (token: string | null) => {
  const { href, protocol, port } = window.location;
  const url = new URL("websocket", href);
  url.protocol = protocol.replace("http", "ws");
  url.port = port;
  url.search = new URLSearchParams({
    token: token ?? "",
  }).toString();
  return url.toString();
};

const WebSocketUpdateProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { lastMessage } = useWebSocket(
    wsUrl(token),
    {
      shouldReconnect: () => true,
    },
    Boolean(token)
  );

  return (
    <WebSocketUpdateContext.Provider value={{ lastMessage }}>
      {children}
    </WebSocketUpdateContext.Provider>
  );
};

export { WebSocketUpdateContext, WebSocketUpdateProvider };
