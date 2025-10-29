import { useContext, useEffect } from "react";
import { WebSocketContext } from "@/lib/websocket";

export function useRefetch(refetchFunction: () => Promise<unknown>) {
  const { lastMessage } = useContext(WebSocketContext);

  useEffect(() => {
    refetchFunction()?.catch(console.error);
  }, [lastMessage, refetchFunction]);

  useEffect(() => {
    const listener = () => {
      if (!document.hidden) {
        refetchFunction()?.catch(console.error);
      }
    };
    window.addEventListener("visibilitychange", listener);
    return () => {
      window.removeEventListener("visibilitychange", listener);
    };
  }, [refetchFunction]);
}
