import React from "react";
import { useParams } from "react-router-dom";

export function RoomPage() {
  const { roomId } = useParams();

  return (
    <div>
      <h1>Room Page - To be implemented</h1>
      <p>Room ID: {roomId}</p>
    </div>
  );
}
