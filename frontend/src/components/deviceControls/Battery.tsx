import React from "react";
import BatteryIcon from "../BatteryIcon";

const Battery = ({
  batteryPercentage,
  name,
}: {
  batteryPercentage: number;
  name: string;
}) => {
  return (
    <>
      <span style={{ marginRight: 8 }}>
        {<BatteryIcon batteryPercentage={batteryPercentage} name={name} />}
      </span>
      {batteryPercentage === -1 ? "Unknown" : `${batteryPercentage}%`}
    </>
  );
};

export default Battery;
