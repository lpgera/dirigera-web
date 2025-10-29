import React from "react";
import { Button, Col, Form, Input, Result, Row, Typography } from "antd";
import { IoMdLogIn } from "react-icons/io";

interface LoginFormProps {
  onSubmit: (password: string) => void;
  loading?: boolean;
  error?: Error | null;
}

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const handleFinish = (values: Record<string, string>) => {
    onSubmit(values.password);
  };

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Result
          status="403"
          extra={
            <Row justify="center">
              <Col>
                <Form layout="inline" onFinish={handleFinish}>
                  <Form.Item name="password">
                    <Input.Password
                      placeholder="Enter password"
                      style={{ width: "200px" }}
                      disabled={loading}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      shape="circle"
                      type="primary"
                      htmlType="submit"
                      title="Login"
                      loading={loading}
                      icon={
                        <IoMdLogIn
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      }
                    />
                  </Form.Item>
                </Form>
                {error && (
                  <Typography.Text type="danger" style={{ marginTop: 8 }}>
                    {error.message}
                  </Typography.Text>
                )}
              </Col>
            </Row>
          }
        />
      </div>
      <div style={{ margin: 8 }}>
        {__COMMIT_SHA__ ? (
          <Typography.Link
            target="_blank"
            href={`https://github.com/lpgera/dirigera-web/compare/master..${__COMMIT_SHA__}`}
          >
            Check for updates ({__COMMIT_SHA__.substring(0, 7)})
          </Typography.Link>
        ) : (
          <Typography.Text>Dev mode</Typography.Text>
        )}
      </div>
    </>
  );
}
