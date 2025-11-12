import type { Meta, StoryObj } from "@storybook/react";
import { Row, Col } from "./Grid";
import { Card } from "./Card";

const meta = {
  title: "Components/UI/Grid",
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ padding: "20px" }}>{story()}</div>],
} satisfies Meta;

export default meta;

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: "var(--color-primary)",
      color: "white",
      padding: "16px",
      textAlign: "center",
      borderRadius: "4px",
    }}
  >
    {children}
  </div>
);

export const BasicRow: StoryObj = {
  name: "Basic Row",
  render: () => (
    <Row>
      <Col span={24}>
        <DemoBox>col-24</DemoBox>
      </Col>
    </Row>
  ),
};

export const TwoColumns: StoryObj = {
  name: "Two Columns",
  render: () => (
    <Row gutter={16}>
      <Col span={12}>
        <DemoBox>col-12</DemoBox>
      </Col>
      <Col span={12}>
        <DemoBox>col-12</DemoBox>
      </Col>
    </Row>
  ),
};

export const ThreeColumns: StoryObj = {
  name: "Three Columns",
  render: () => (
    <Row gutter={16}>
      <Col span={8}>
        <DemoBox>col-8</DemoBox>
      </Col>
      <Col span={8}>
        <DemoBox>col-8</DemoBox>
      </Col>
      <Col span={8}>
        <DemoBox>col-8</DemoBox>
      </Col>
    </Row>
  ),
};

export const FourColumns: StoryObj = {
  name: "Four Columns",
  render: () => (
    <Row gutter={16}>
      <Col span={6}>
        <DemoBox>col-6</DemoBox>
      </Col>
      <Col span={6}>
        <DemoBox>col-6</DemoBox>
      </Col>
      <Col span={6}>
        <DemoBox>col-6</DemoBox>
      </Col>
      <Col span={6}>
        <DemoBox>col-6</DemoBox>
      </Col>
    </Row>
  ),
};

export const MixedColumns: StoryObj = {
  name: "Mixed Column Sizes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <DemoBox>col-8</DemoBox>
        </Col>
        <Col span={16}>
          <DemoBox>col-16</DemoBox>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
        <Col span={12}>
          <DemoBox>col-12</DemoBox>
        </Col>
        <Col span={6}>
          <DemoBox>col-6</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const FlexColumns: StoryObj = {
  name: "Flex Columns",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Row gutter={8}>
        <Col flex="none">
          <DemoBox>flex: none</DemoBox>
        </Col>
        <Col flex="auto">
          <DemoBox>flex: auto</DemoBox>
        </Col>
        <Col flex="none">
          <DemoBox>flex: none</DemoBox>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col flex="100px">
          <DemoBox>100px</DemoBox>
        </Col>
        <Col flex="auto">
          <DemoBox>auto</DemoBox>
        </Col>
      </Row>
    </div>
  ),
};

export const Alignment: StoryObj = {
  name: "Row Alignment",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>Align: middle</p>
        <Row align="middle" gutter={8}>
          <Col flex="none">
            <DemoBox>
              <div
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Tall
              </div>
            </DemoBox>
          </Col>
          <Col flex="auto">
            <DemoBox>Short</DemoBox>
          </Col>
        </Row>
      </div>
    </div>
  ),
};

export const Justify: StoryObj = {
  name: "Row Justify",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>Justify: start</p>
        <Row justify="start" gutter={8}>
          <Col flex="none">
            <DemoBox>1</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>2</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>3</DemoBox>
          </Col>
        </Row>
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Justify: center</p>
        <Row justify="center" gutter={8}>
          <Col flex="none">
            <DemoBox>1</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>2</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>3</DemoBox>
          </Col>
        </Row>
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Justify: end</p>
        <Row justify="end" gutter={8}>
          <Col flex="none">
            <DemoBox>1</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>2</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>3</DemoBox>
          </Col>
        </Row>
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Justify: space-between</p>
        <Row justify="space-between" gutter={8}>
          <Col flex="none">
            <DemoBox>1</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>2</DemoBox>
          </Col>
          <Col flex="none">
            <DemoBox>3</DemoBox>
          </Col>
        </Row>
      </div>
    </div>
  ),
};

export const RealWorldExample: StoryObj = {
  name: "Real World Example",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card 1">Content for card 1</Card>
        </Col>
        <Col span={8}>
          <Card title="Card 2">Content for card 2</Card>
        </Col>
        <Col span={8}>
          <Card title="Card 3">Content for card 3</Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Main Content">This takes up 2/3 of the width</Card>
        </Col>
        <Col span={8}>
          <Card title="Sidebar">This takes up 1/3 of the width</Card>
        </Col>
      </Row>
    </div>
  ),
};
