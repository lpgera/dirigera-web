import React from "react";
import { Col, Layout, Row, Typography } from "antd";
import { BsFillHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";

interface LayoutHeaderProps {
  title?: string;
  onLogout?: () => void;
}

export function LayoutHeader({
  title = "Peter Bangs vej 213",
}: LayoutHeaderProps) {
  return (
    <Row
      gutter={8}
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--header-z-index)",
        backgroundColor: "var(--header-bg)",
        paddingBottom: "var(--spacing-md)",
        paddingTop: "var(--spacing-md)",
        boxSizing: "border-box",
        gap: "var(--spacing-md)",
      }}
    >
      <Col flex="0">
        <Link to="/">
          <div
            style={{
              width: 46,
              height: 46,
              backgroundColor: "var(--color-primary)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BsFillHouseFill
              size={32}
              style={{
                color: "#fbd912",
              }}
            />
          </div>
        </Link>
      </Col>
      <Col flex="auto">
        <Typography.Title>
          <Link to="/" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </Link>
        </Typography.Title>
      </Col>
    </Row>
  );
}

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout style={{ backgroundColor: "var(--color-background)" }}>
      <Layout.Content
        style={{
          minHeight: "100vh",
          paddingRight: "var(--spacing-md)",
          paddingLeft: "var(--spacing-md)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
}
