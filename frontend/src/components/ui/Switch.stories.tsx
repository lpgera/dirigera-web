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

export const WithLabel: Story = {
  args: {
    label: "Enable feature",
    checked: false,
    disabled: false,
  },
};

export const WithLabelChecked: Story = {
  args: {
    label: "Enable notifications",
    checked: true,
    disabled: false,
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

export const WithLabels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Switch label="Dark mode" checked={false} onChange={() => {}} />
      <Switch label="Notifications" checked={true} onChange={() => {}} />
      <Switch
        label="Auto-update"
        checked={false}
        disabled
        onChange={() => {}}
      />
      <Switch
        label="Privacy mode"
        checked={true}
        disabled
        onChange={() => {}}
      />
    </div>
  ),
};

export const WithCustomColor: Story = {
  args: {
    checked: true,
    color: "#f5a623",
  },
};

export const CustomColorOrange: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#1a1a2e",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Switch checked={checked} onChange={setChecked} color="#f5a623" />
        <span style={{ color: "white" }}>Warm Light</span>
      </div>
    );
  },
};

export const CustomColorBlue: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#1a1a2e",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Switch checked={checked} onChange={setChecked} color="#4a9eff" />
        <span style={{ color: "white" }}>Cool Light</span>
      </div>
    );
  },
};

export const CustomColorVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        background: "#1a1a2e",
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} onChange={() => {}} color="#f5a623" />
        <span style={{ color: "white" }}>Warm Orange</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} onChange={() => {}} color="#4a9eff" />
        <span style={{ color: "white" }}>Cool Blue</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} onChange={() => {}} color="#ff6b6b" />
        <span style={{ color: "white" }}>Red</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} onChange={() => {}} color="#51cf66" />
        <span style={{ color: "white" }}>Green</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={true} onChange={() => {}} color="#cc5de8" />
        <span style={{ color: "white" }}>Purple</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Switch checked={false} onChange={() => {}} color="#f5a623" />
        <span style={{ color: "white" }}>Off (color ignored)</span>
      </div>
    </div>
  ),
};
