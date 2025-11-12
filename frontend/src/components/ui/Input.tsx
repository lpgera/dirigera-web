import React, { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Show error state styling */
  error?: boolean;
}

export function Input({ className = "", error = false, ...props }: InputProps) {
  const classes = ["input", error && "input-error", className]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} {...props} />;
}

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Show error state styling */
  error?: boolean;
}

export function PasswordInput({
  className = "",
  error = false,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="input-password-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        className={["input", error && "input-error", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      <button
        type="button"
        className="input-password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </button>
    </div>
  );
}
