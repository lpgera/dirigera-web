import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScenesList } from "./ScenesList";

describe("ScenesList", () => {
  it("renders children", () => {
    render(
      <ScenesList>
        <div>Child 1</div>
        <div>Child 2</div>
      </ScenesList>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <ScenesList title="My Scenes">
        <div>Scene</div>
      </ScenesList>
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "My Scenes"
    );
  });

  it("does not render title when not provided", () => {
    render(
      <ScenesList>
        <div>Scene</div>
      </ScenesList>
    );

    expect(
      screen.queryByRole("heading", { level: 3 })
    ).not.toBeInTheDocument();
  });

  it("applies correct layout class", () => {
    const { container } = render(
      <ScenesList>
        <div>Scene</div>
      </ScenesList>
    );

    const row = container.querySelector(".row");
    expect(row).toBeInTheDocument();
  });
});
