import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import ApolloProvider from "./ApolloProvider";
import { AuthProvider } from "./AuthContext";
import { WebSocketUpdateProvider } from "./WebSocketUpdateProvider";
import Frame from "./Frame";
import Rooms from "./Rooms";
import Room from "./Room";

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <WebSocketUpdateProvider>
            <RouterProvider
              router={createHashRouter([
                {
                  path: "/",
                  element: <Frame />,
                  children: [
                    {
                      index: true,
                      element: <Rooms />,
                    },
                    {
                      path: "room/:roomId",
                      element: <Room />,
                    },
                  ],
                },
              ])}
            />
          </WebSocketUpdateProvider>
        </ConfigProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
