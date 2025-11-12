import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
  component: Typography.Text,
  title: "Components/UI/Typography",
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ padding: "20px" }}>{story()}</div>],
} satisfies Meta<typeof Typography.Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: () => <Typography.Text>This is normal text</Typography.Text>,
};

export const TextPrimary: Story = {
  render: () => (
    <Typography.Text type="primary">Primary text color</Typography.Text>
  ),
};

export const TextSecondary: Story = {
  render: () => (
    <Typography.Text type="secondary">Secondary text color</Typography.Text>
  ),
};

export const TextSuccess: Story = {
  render: () => (
    <Typography.Text type="success">Success text color</Typography.Text>
  ),
};

export const TextWarning: Story = {
  render: () => (
    <Typography.Text type="warning">Warning text color</Typography.Text>
  ),
};

export const TextDanger: Story = {
  render: () => (
    <Typography.Text type="danger">Danger text color</Typography.Text>
  ),
};

export const Link: Story = {
  render: () => (
    <Typography.Link href="https://example.com" target="_blank">
      This is a link
    </Typography.Link>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography.Text>Default text</Typography.Text>
      <Typography.Text type="primary">Primary text</Typography.Text>
      <Typography.Text type="secondary">Secondary text</Typography.Text>
      <Typography.Text type="success">Success message</Typography.Text>
      <Typography.Text type="warning">Warning message</Typography.Text>
      <Typography.Text type="danger">Error message</Typography.Text>
      <Typography.Link href="#" onClick={(e) => e.preventDefault()}>
        Click this link
      </Typography.Link>
    </div>
  ),
};
