import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { MdAdd, MdDelete, MdEdit, MdSave } from "react-icons/md";

const meta = {
  component: Button,
  title: "Components/UI/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "default", "text"],
    },
    shape: {
      control: "select",
      options: ["default", "circle"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: <MdAdd />,
    children: "Add Item",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "primary",
    shape: "circle",
    icon: <MdEdit />,
  },
};

export const CircleButtons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button variant="primary" shape="circle" icon={<MdAdd />} />
      <Button variant="default" shape="circle" icon={<MdEdit />} />
      <Button variant="default" shape="circle" icon={<MdDelete />} />
      <Button variant="primary" shape="circle" icon={<MdSave />} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Loading",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const Block: Story = {
  args: {
    variant: "primary",
    block: true,
    children: "Block Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "400px",
      }}
    >
      <Button variant="primary">Primary Button</Button>
      <Button variant="default">Default Button</Button>
      <Button variant="text">Text Button</Button>
      <Button variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button variant="default" disabled>
        Disabled Default
      </Button>
      <Button variant="primary" icon={<MdAdd />}>
        With Icon
      </Button>
      <Button variant="primary" loading>
        Loading
      </Button>
    </div>
  ),
};
