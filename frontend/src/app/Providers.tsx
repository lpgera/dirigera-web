import React, { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, theme } from "antd";
import { ApolloProvider } from "@apollo/client/react";
import { queryClient } from "@/lib/react-query";
import { createApolloClient } from "@/lib/apollo";
import { useAuthStore } from "@/features/auth";
import { WebSocketProvider } from "@/lib/websocket";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const token = useAuthStore((state) => state.token);
  const clearToken = useAuthStore((state) => state.clearToken);

  const apolloClient = createApolloClient(token, clearToken);

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <WebSocketProvider>{children}</WebSocketProvider>
        </ConfigProvider>
      </ApolloProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
