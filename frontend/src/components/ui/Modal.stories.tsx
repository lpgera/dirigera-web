import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import React from "react";

const meta = {
  component: Modal,
  title: "Components/UI/Modal",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: true,
    title: "Modal Title",
    children: <p>This is the modal content.</p>,
    onCancel: () => console.log("Cancel clicked"),
    onOk: () => console.log("OK clicked"),
  },
};

export const WithoutFooter: Story = {
  args: {
    open: true,
    title: "Information",
    footer: null,
    children: <p>This modal has no footer buttons.</p>,
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const CustomFooter: Story = {
  args: {
    open: true,
    title: "Custom Actions",
    children: <p>This modal has custom footer buttons.</p>,
    footer: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="default">Cancel</Button>
        <Button variant="default">Save Draft</Button>
        <Button variant="primary">Publish</Button>
      </div>
    ),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const LongContent: Story = {
  args: {
    open: true,
    title: "Long Content Modal",
    children: (
      <div>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>
    ),
    onCancel: () => console.log("Cancel clicked"),
    onOk: () => console.log("OK clicked"),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "40px" }}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal
          open={open}
          title="Interactive Modal"
          onCancel={() => setOpen(false)}
          onOk={() => {
            console.log("OK clicked");
            setOpen(false);
          }}
        >
          <p>Click outside, press Escape, or use the buttons to close.</p>
        </Modal>
      </div>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "40px" }}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Modal
          open={open}
          title="Confirm Deletion"
          onCancel={() => setOpen(false)}
          onOk={() => {
            console.log("Item deleted");
            setOpen(false);
          }}
        >
          <p>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </Modal>
      </div>
    );
  },
};
