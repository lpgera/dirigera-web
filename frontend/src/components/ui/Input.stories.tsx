import type { Meta, StoryObj } from "@storybook/react";
import { Input, PasswordInput } from "./Input";

const meta = {
  component: Input,
  title: "Components/UI/Input",
  tags: ["autodocs"],
  decorators: [
    (story) => (
      <div style={{ padding: "20px", maxWidth: "400px" }}>{story()}</div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    value: "Sample text",
    placeholder: "Enter text...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter text...",
    error: true,
  },
};

export const Password: Story = {
  render: () => <PasswordInput placeholder="Enter password..." />,
};

export const PasswordWithValue: Story = {
  render: () => (
    <PasswordInput value="secret123" placeholder="Enter password..." />
  ),
};

export const PasswordDisabled: Story = {
  render: () => <PasswordInput placeholder="Enter password..." disabled />,
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
        >
          Normal Input
        </label>
        <Input placeholder="Enter text..." />
      </div>
      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
        >
          With Value
        </label>
        <Input value="Sample text" />
      </div>
      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
        >
          Disabled
        </label>
        <Input placeholder="Disabled..." disabled />
      </div>
      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
        >
          Error State
        </label>
        <Input placeholder="Error..." error />
      </div>
      <div>
        <label
          style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}
        >
          Password
        </label>
        <PasswordInput placeholder="Enter password..." />
      </div>
    </div>
  ),
};
