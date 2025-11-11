import React, { FormEvent } from "react";
import { IoMdLogIn } from "react-icons/io";
import {
  Button,
  Col,
  Form,
  FormItem,
  PasswordInput,
  Result,
  Row,
  Typography,
} from "@/components/ui";

interface LoginFormProps {
  onSubmit: (password: string) => void;
  loading?: boolean;
  error?: Error | null;
}

export function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    if (password) {
      onSubmit(password);
    }
  };

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Result
          status="403"
          extra={
            <Row justify="center">
              <Col>
                <Form layout="inline" onSubmit={handleSubmit}>
                  <FormItem>
                    <PasswordInput
                      name="password"
                      placeholder="Enter password"
                      style={{ width: "200px" }}
                      disabled={loading}
                      autoFocus
                    />
                  </FormItem>
                  <FormItem>
                    <Button
                      shape="circle"
                      variant="primary"
                      type="submit"
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
                  </FormItem>
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
