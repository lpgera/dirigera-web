import React from 'react'
import {
  MdOutlineBattery0Bar,
  MdOutlineBattery1Bar,
  MdOutlineBattery2Bar,
  MdOutlineBattery3Bar,
  MdOutlineBattery4Bar,
  MdOutlineBattery5Bar,
  MdOutlineBattery6Bar,
  MdOutlineBatteryFull,
} from 'react-icons/md'

function getBatteryIconComponent(batteryPercentage: number) {
  if (batteryPercentage <= 10) {
    return MdOutlineBattery0Bar
  } else if (batteryPercentage <= 25) {
    return MdOutlineBattery1Bar
  } else if (batteryPercentage <= 40) {
    return MdOutlineBattery2Bar
  } else if (batteryPercentage <= 55) {
    return MdOutlineBattery3Bar
  } else if (batteryPercentage <= 70) {
    return MdOutlineBattery4Bar
  } else if (batteryPercentage <= 85) {
    return MdOutlineBattery5Bar
  } else if (batteryPercentage <= 99) {
    return MdOutlineBattery6Bar
  } else {
    return MdOutlineBatteryFull
  }
}

const Battery = ({ batteryPercentage }: { batteryPercentage: number }) => {
  return (
    <>
      {React.createElement(getBatteryIconComponent(batteryPercentage), {
        size: 32,
        style: {
          verticalAlign: 'middle',
          margin: '1px',
          paddingRight: '8px',
        },
      })}
      {batteryPercentage}%
    </>
  )
}

export default Battery
