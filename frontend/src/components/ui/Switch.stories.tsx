import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Switch } from "./Switch";

const meta = {
  component: Switch,
  title: "Components/UI/Switch",
  tags: ["autodocs"],
  args: {
    onChange: (checked: boolean) => console.log("Switch changed to:", checked),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={checked} onChange={setChecked} />
        <span>Status: {checked ? "On" : "Off"}</span>
      </div>
    );
  },
};

export const MultipleStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={false} onChange={() => {}} />
        <span>Unchecked</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} onChange={() => {}} />
        <span>Checked</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={false} disabled onChange={() => {}} />
        <span>Disabled Unchecked</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} disabled onChange={() => {}} />
        <span>Disabled Checked</span>
      </div>
    </div>
  ),
};
