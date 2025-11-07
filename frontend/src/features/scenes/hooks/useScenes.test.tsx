import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { useScenes } from "./useScenes";
import { SCENES_QUERY } from "../api/scenesApi";

const mockScenes = [
  { id: "scene1", name: "Morning Scene" },
  { id: "scene2", name: "Evening Scene" },
];

describe("useScenes", () => {
  it("returns scenes array from query", async () => {
    const mocks = [
      {
        request: {
          query: SCENES_QUERY,
        },
        result: {
          data: {
            scenes: mockScenes,
          },
        },
      },
    ];

    const { result } = renderHook(() => useScenes(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.scenes).toEqual(mockScenes);
    expect(result.current.error).toBeUndefined();
  });

  it("returns loading state", () => {
    const mocks = [
      {
        request: {
          query: SCENES_QUERY,
        },
        result: {
          data: {
            scenes: mockScenes,
          },
        },
      },
    ];

    const { result } = renderHook(() => useScenes(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
  });

  it("returns error state", async () => {
    const mocks = [
      {
        request: {
          query: SCENES_QUERY,
        },
        error: new Error("Failed to fetch scenes"),
      },
    ];

    const { result } = renderHook(() => useScenes(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    expect(result.current.error?.message).toBe("Failed to fetch scenes");
  });

  it("provides refetch function", async () => {
    const mocks = [
      {
        request: {
          query: SCENES_QUERY,
        },
        result: {
          data: {
            scenes: mockScenes,
          },
        },
      },
      {
        request: {
          query: SCENES_QUERY,
        },
        result: {
          data: {
            scenes: [{ id: "scene3", name: "Updated Scene" }],
          },
        },
      },
    ];

    const { result } = renderHook(() => useScenes(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe("function");
  });

  it("returns empty array when no scenes", async () => {
    const mocks = [
      {
        request: {
          query: SCENES_QUERY,
        },
        result: {
          data: {
            scenes: [],
          },
        },
      },
    ];

    const { result } = renderHook(() => useScenes(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.scenes).toEqual([]);
  });
});
