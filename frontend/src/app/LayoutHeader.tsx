import React from "react";
import { Row, Col } from "@/components/ui";
import { BsFillHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Logout } from "@/features/auth";

interface LayoutHeaderProps {
  title?: string;
  onLogout?: () => void;
}

export function LayoutHeader({
  title = "Peter Bangs vej 213",
}: LayoutHeaderProps) {
  return (
    <Row gutter={8} className="layout-header">
      <Col flex="none">
        <Link to="/" className="layout-header-logo">
          <div className="layout-header-logo-circle">
            <BsFillHouseFill size={32} className="layout-header-logo-icon" />
          </div>
        </Link>
      </Col>
      <Col flex="auto">
        <h1 className="layout-header-title">
          <Link to="/" className="layout-header-title-link">
            {title}
          </Link>
        </h1>
      </Col>
      <Col flex="none">
        <div className="root-layout-logout">
          <Logout />
        </div>
      </Col>
    </Row>
  );
}
