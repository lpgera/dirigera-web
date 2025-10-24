import { useContext, useEffect } from "react";
import { WebSocketUpdateContext } from "./components/WebSocketUpdateProvider";

export const useRefetch = (refetchFunction: () => Promise<any>) => {
  const { lastMessage } = useContext(WebSocketUpdateContext);
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
};
