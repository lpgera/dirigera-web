import React, { useContext } from 'react'
import { Button, Col, Form, Input, Result, Row } from 'antd'
import { useMutation, gql } from '@apollo/client'
import { AuthContext } from './AuthContext'
import { LoginMutation, LoginMutationVariables } from './Login.types.gen'
import { IoMdLogIn } from 'react-icons/io'

const Login = () => {
  const { dispatch } = useContext(AuthContext)
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(gql`
    mutation Login($password: String!) {
      login(password: $password)
    }
  `)

  const loginAndDispatch = async (values: Record<string, string>) => {
    const { data } = await login({
      variables: {
        password: values.password,
      },
    })

    const token = data?.login

    if (token) {
      dispatch({ type: 'login', token })
    }
  }

  return (
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
                  style={{ width: '200px' }}
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
                      size="1.1em"
                      style={{
                        verticalAlign: 'text-bottom',
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
  )
}

export default Login
