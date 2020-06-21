import { IoMdLogOut } from 'react-icons/io'
import React, { useContext } from 'react'
import { Button, Tooltip } from 'antd'
import { AuthContext } from './AuthContext'

const Logout = () => {
  const { state, dispatch } = useContext(AuthContext)

  if (!state.token) {
    return null
  }

  return (
    <Tooltip title="Logout">
      <Button
        shape="circle"
        onClick={() => {
          dispatch({ type: 'logout' })
        }}
        style={{
          verticalAlign: 'middle',
        }}
        icon={
          <IoMdLogOut
            size="1.1em"
            style={{
              verticalAlign: 'text-bottom',
            }}
          />
        }
      />
    </Tooltip>
  )
}

export default Logout
