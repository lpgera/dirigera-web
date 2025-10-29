import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { Providers } from "./Providers";
import "@/styles/global.css";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { RoomsPage } = await import("./pages/RoomsPage");
          return { Component: RoomsPage };
        },
      },
      {
        path: "room/:roomId",
        lazy: async () => {
          const { RoomPage } = await import("./pages/RoomPage");
          return { Component: RoomPage };
        },
      },
    ],
  },
]);

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
