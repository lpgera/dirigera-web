import React from "react";
import { Button } from "@/components/ui";
import "./SceneButton.css";

interface SceneButtonProps {
  name: string;
  onClick: () => void;
  disabled?: boolean | undefined;
  loading?: boolean | undefined;
}

export function SceneButton({
  name,
  onClick,
  disabled,
  loading,
}: SceneButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      className="scene-button"
    >
      {name}
    </Button>
  );
}
