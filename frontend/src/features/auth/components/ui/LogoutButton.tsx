import React from "react";
import { Button } from "antd";
import { IoMdLogOut } from "react-icons/io";

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button
      shape="circle"
      onClick={onLogout}
      icon={
        <IoMdLogOut
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }
      title="Logout"
    />
  );
}
