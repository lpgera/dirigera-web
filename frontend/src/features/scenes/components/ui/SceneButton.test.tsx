import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SceneButton } from "./SceneButton";

describe("SceneButton", () => {
  it("renders button with name", () => {
    render(<SceneButton name="Living Room Scene" onClick={vi.fn()} />);
    expect(screen.getByText("Living Room Scene")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<SceneButton name="Bedroom Scene" onClick={handleClick} />);

    await user.click(screen.getByRole("button", { name: "Bedroom Scene" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<SceneButton name="Kitchen Scene" onClick={vi.fn()} loading />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("respects disabled state", () => {
    render(<SceneButton name="Office Scene" onClick={vi.fn()} disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <SceneButton name="Disabled Scene" onClick={handleClick} disabled />
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies scene-button className", () => {
    render(<SceneButton name="Scene" onClick={vi.fn()} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("scene-button");
  });
});
