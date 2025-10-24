import React, { useContext } from "react";
import { BsFillHouseFill } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import { Col, Layout, Row, Typography } from "antd";
import { AuthContext } from "./AuthContext";
import Login from "./Login";
import Logout from "./Logout";

const Frame = () => {
  const { state: authState } = useContext(AuthContext);
  return (
    <Layout style={{ backgroundColor: "rgb(30 30 30)" }}>
      <Layout.Content
        style={{
          minHeight: "100vh",
          paddingRight: "16px",
          paddingLeft: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Row
          gutter={8}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backgroundColor: "rgb(30 30 30)",
            paddingBottom: "16px",
            paddingTop: "16px",

            boxSizing: "border-box",
            gap: "16px",
          }}
        >
          <Col flex="0">
            <Link to="/">
              <div
                style={{
                  width: 46,
                  height: 46,
                  backgroundColor: "#0059aa",
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
              <Link to="/" style={{ color: "#ffffffd9" }}>
                Peter Bangs vej 213
              </Link>
            </Typography.Title>
          </Col>
          <Col flex="0">
            <Logout />
          </Col>
        </Row>
        <div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
          {authState.token ? <Outlet /> : <Login />}
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Frame;
