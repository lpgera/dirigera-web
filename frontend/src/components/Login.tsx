import React, { useContext } from "react";
import { Button, Col, Form, Input, Result, Row, Typography } from "antd";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { AuthContext } from "./AuthContext";
import { LoginMutation, LoginMutationVariables } from "./Login.types.gen";
import { IoMdLogIn } from "react-icons/io";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(gql`
    mutation Login($password: String!) {
      login(password: $password)
    }
  `);

  const loginAndDispatch = async (values: Record<string, string>) => {
    const { data } = await login({
      variables: {
        password: values.password,
      },
    });

    const token = data?.login;

    if (token) {
      dispatch({ type: "login", token });
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
                <Form
                  layout="inline"
                  onFinish={(values) => loginAndDispatch(values)}
                >
                  <Form.Item name="password">
                    <Input.Password
                      placeholder="Enter password"
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      shape="circle"
                      type="primary"
                      htmlType="submit"
                      title="Login"
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
              </Col>
            </Row>
          }
        />
      </div>
      <div style={{ margin: 8 }}>
        {__COMMIT_SHA__ ? (
          <Typography.Link
            target={"_blank"}
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
};

export default Login;
