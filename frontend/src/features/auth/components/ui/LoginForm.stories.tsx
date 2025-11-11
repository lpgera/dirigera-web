import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta = {
  component: LoginForm,
  title: "Features/Auth/UI/LoginForm",
  tags: ["autodocs"],
  args: {
    onSubmit: (password: string) =>
      console.log("Login with password:", password),
  },
  decorators: [
    (story) => (
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        {story()}
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
  },
};

export const WithError: Story = {
  args: {
    loading: false,
    error: new Error("Invalid password. Please try again."),
  },
};

export const NetworkError: Story = {
  args: {
    loading: false,
    error: new Error("Network error. Please check your connection."),
  },
};
