import type { Meta, StoryObj } from "@storybook/react";
import { Divider, Space, Skeleton, Result } from "./Utils";
import { Button } from "./Button";

const meta = {
  title: "Components/UI/Utils",
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ padding: "20px" }}>{story()}</div>],
} satisfies Meta;

export default meta;

export const DividerStory: StoryObj = {
  name: "Divider",
  render: () => (
    <div>
      <p>Content above divider</p>
      <Divider />
      <p>Content below divider</p>
    </div>
  ),
};

export const SpaceHorizontal: StoryObj = {
  name: "Space - Horizontal",
  render: () => (
    <Space direction="horizontal" size="middle">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Space>
  ),
};

export const SpaceVertical: StoryObj = {
  name: "Space - Vertical",
  render: () => (
    <Space direction="vertical" size="middle">
      <Button block>Button 1</Button>
      <Button block>Button 2</Button>
      <Button block>Button 3</Button>
    </Space>
  ),
};

export const SpaceSmall: StoryObj = {
  name: "Space - Small Gap",
  render: () => (
    <Space direction="horizontal" size="small">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Space>
  ),
};

export const SpaceLarge: StoryObj = {
  name: "Space - Large Gap",
  render: () => (
    <Space direction="horizontal" size="large">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Space>
  ),
};

export const SkeletonStory: StoryObj = {
  name: "Skeleton",
  render: () => <Skeleton active paragraph={{ rows: 5 }} />,
};

export const SkeletonInactive: StoryObj = {
  name: "Skeleton - Inactive",
  render: () => <Skeleton paragraph={{ rows: 3 }} />,
};

export const ResultError: StoryObj = {
  name: "Result - Error",
  render: () => (
    <Result
      status="error"
      title="Something went wrong"
      subTitle="Please try again later"
      extra={<Button variant="primary">Go Back</Button>}
    />
  ),
};

export const ResultSuccess: StoryObj = {
  name: "Result - Success",
  render: () => (
    <Result
      status="success"
      title="Successfully completed!"
      subTitle="Your operation was successful"
      extra={<Button variant="primary">Continue</Button>}
    />
  ),
};

export const Result403: StoryObj = {
  name: "Result - 403 Forbidden",
  render: () => (
    <Result
      status="403"
      title="Access Denied"
      subTitle="You don't have permission to access this resource"
      extra={<Button variant="primary">Go Home</Button>}
    />
  ),
};

export const Result404: StoryObj = {
  name: "Result - 404 Not Found",
  render: () => (
    <Result
      status="404"
      title="Page Not Found"
      subTitle="The page you are looking for does not exist"
      extra={<Button variant="primary">Go Home</Button>}
    />
  ),
};

export const ResultWarning: StoryObj = {
  name: "Result - Warning",
  render: () => (
    <Result
      status="warning"
      title="Warning"
      subTitle="Please review the information before proceeding"
      extra={
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <Button variant="default">Cancel</Button>
          <Button variant="primary">Proceed</Button>
        </div>
      }
    />
  ),
};

export const ResultInfo: StoryObj = {
  name: "Result - Info",
  render: () => (
    <Result
      status="info"
      title="Information"
      subTitle="Here is some helpful information"
      extra={<Button variant="primary">Got it</Button>}
    />
  ),
};
