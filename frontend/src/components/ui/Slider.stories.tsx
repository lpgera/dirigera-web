import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Slider } from "./Slider";

const meta = {
  component: Slider,
  title: "Components/UI/Slider",
  tags: ["autodocs"],
  args: {
    onChange: (value: number) => console.log("Slider value:", value),
    onChangeComplete: (value: number) =>
      console.log("Slider final value:", value),
  },
  decorators: [
    (story) => (
      <div style={{ padding: "40px 20px", maxWidth: "400px" }}>{story()}</div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: 50,
    disabled: false,
    tooltip: true,
  },
};

export const WithTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    value: 75,
    tooltip: true,
  },
};

export const WithoutTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    value: 30,
    tooltip: false,
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    value: 60,
    disabled: true,
  },
};

export const CustomRange: Story = {
  args: {
    min: 1,
    max: 10,
    value: 5,
    tooltip: true,
  },
};

export const Volume: Story = {
  args: {
    min: 0,
    max: 100,
    value: 65,
    tooltip: true,
  },
};

export const Temperature: Story = {
  args: {
    min: 2202,
    max: 4000,
    value: 3000,
    tooltip: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    return (
      <div>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={setValue}
          onChangeComplete={(val) => console.log("Final:", val)}
          tooltip={true}
        />
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          Current Value: {value}
        </div>
      </div>
    );
  },
};
