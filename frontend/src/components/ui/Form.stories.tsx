import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormItem } from "./Form";
import { Input, PasswordInput } from "./Input";
import { Button } from "./Button";

const meta = {
  component: Form,
  title: "Components/UI/Form",
  tags: ["autodocs"],
  decorators: [
    (story) => (
      <div style={{ padding: "20px", maxWidth: "600px" }}>{story()}</div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <Form layout="vertical" onSubmit={(e) => e.preventDefault()}>
      <FormItem label="Username">
        <Input placeholder="Enter username" />
      </FormItem>
      <FormItem label="Password">
        <PasswordInput placeholder="Enter password" />
      </FormItem>
      <FormItem>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Form layout="horizontal" onSubmit={(e) => e.preventDefault()}>
      <FormItem label="Email">
        <Input placeholder="Enter email" type="email" />
      </FormItem>
      <FormItem label="Password">
        <PasswordInput placeholder="Enter password" />
      </FormItem>
      <FormItem>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </FormItem>
    </Form>
  ),
};

export const Inline: Story = {
  render: () => (
    <Form layout="inline" onSubmit={(e) => e.preventDefault()}>
      <FormItem>
        <Input placeholder="Username" />
      </FormItem>
      <FormItem>
        <PasswordInput placeholder="Password" />
      </FormItem>
      <FormItem>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </FormItem>
    </Form>
  ),
};

export const WithErrors: Story = {
  render: () => (
    <Form layout="vertical" onSubmit={(e) => e.preventDefault()}>
      <FormItem label="Email" error="Please enter a valid email address">
        <Input placeholder="Enter email" error type="email" />
      </FormItem>
      <FormItem label="Password" error="Password must be at least 8 characters">
        <PasswordInput placeholder="Enter password" error />
      </FormItem>
      <FormItem>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <Form layout="vertical" onSubmit={(e) => e.preventDefault()}>
      <FormItem label="Full Name">
        <Input placeholder="John Doe" />
      </FormItem>
      <FormItem label="Email Address">
        <Input placeholder="john@example.com" type="email" />
      </FormItem>
      <FormItem label="Password">
        <PasswordInput placeholder="Enter password" />
      </FormItem>
      <FormItem label="Confirm Password">
        <PasswordInput placeholder="Confirm password" />
      </FormItem>
      <FormItem>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Button variant="default" type="button">
            Cancel
          </Button>
        </div>
      </FormItem>
    </Form>
  ),
};
