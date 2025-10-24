import { IoMdLogOut } from "react-icons/io";
import React, { useContext } from "react";
import { Button } from "antd";
import { AuthContext } from "./AuthContext";

const Logout = () => {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.token) {
    return null;
  }

  return (
    <Button
      shape="circle"
      onClick={() => {
        dispatch({ type: "logout" });
      }}
      icon={
        <IoMdLogOut
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }
      title="Logout"
    />
  );
};

export default Logout;
