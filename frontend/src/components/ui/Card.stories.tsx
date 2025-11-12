import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "./Button";

const meta = {
  component: Card,
  title: "Components/UI/Card",
  tags: ["autodocs"],
  decorators: [
    (story) => (
      <div style={{ padding: "20px", maxWidth: "600px" }}>{story()}</div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <p>This is a basic card with some content inside.</p>,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Card Title",
    children: (
      <div>
        <p>Card content goes here.</p>
        <p>You can add multiple elements.</p>
      </div>
    ),
  },
};

export const WithExtra: Story = {
  args: {
    title: "Settings",
    extra: <Button variant="text">More</Button>,
    children: <p>Card with title and extra actions.</p>,
  },
};

export const ComplexContent: Story = {
  args: {
    title: "User Profile",
    extra: <Button variant="primary">Edit</Button>,
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <strong>Name:</strong> John Doe
        </div>
        <div>
          <strong>Email:</strong> john.doe@example.com
        </div>
        <div>
          <strong>Role:</strong> Administrator
        </div>
      </div>
    ),
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Card title="Card 1">First card content</Card>
      <Card title="Card 2" extra={<Button variant="text">Action</Button>}>
        Second card content
      </Card>
      <Card title="Card 3">Third card content</Card>
    </div>
  ),
};
