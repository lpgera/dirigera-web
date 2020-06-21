import React, { useContext } from 'react'
import { Button, Col, Form, Input, Result, Row } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AuthContext } from './AuthContext'
import { LoginMutation, LoginMutationVariables } from './Login.types.gen'

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
                <Input.Password placeholder="Enter password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      }
    />
  )
}

export default Login
