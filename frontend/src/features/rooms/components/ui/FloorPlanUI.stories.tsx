import type { Meta, StoryObj } from "@storybook/react";
import { FloorPlanUI } from "./FloorPlanUI";
import type { FloorPlanConfig } from "@jesperkihlberg/floor-plan";
import floorsConfig from "@jesperkihlberg/floor-plan/floors-config.json";

/**
 * FloorPlanUI is a pure presentational component that wraps the FloorPlanRenderer.
 * It displays a floor plan based on the provided configuration and scale.
 */

const meta = {
  component: FloorPlanUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FloorPlanUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    config: floorsConfig.floors[0] as FloorPlanConfig,
    scale: 1,
  },
};

export const Scaled: Story = {
  args: {
    config: floorsConfig.floors[0] as FloorPlanConfig,
    scale: 0.8,
  },
};

export const LargeScale: Story = {
  args: {
    config: floorsConfig.floors[0] as FloorPlanConfig,
    scale: 1.5,
  },
};

export const SecondFloor: Story = {
  args: {
    config: floorsConfig.floors[1] as FloorPlanConfig,
    scale: 1,
  },
};
