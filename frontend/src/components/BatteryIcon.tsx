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
  MdOutlineBatteryUnknown,
} from 'react-icons/md'
import { Button, Modal } from 'antd'

export interface BatteryIconProps {
  batteryPercentage: number | null | undefined
  name?: string
}

const BatteryIcon: React.FC<BatteryIconProps> = ({
  batteryPercentage,
  name,
}) => {
  const [open, setOpen] = React.useState(false)
  if (batteryPercentage === null || batteryPercentage === undefined) return null
  let icon
  const pct = batteryPercentage
  if (pct === -1) {
    icon = <MdOutlineBatteryUnknown style={{ color: '#bfbfbf' }} />
  } else if (pct <= 10) {
    icon = <MdOutlineBattery0Bar style={{ color: '#ff4d4f' }} />
  } else if (pct <= 25) {
    icon = <MdOutlineBattery1Bar style={{ color: '#ff7a45' }} />
  } else if (pct <= 40) {
    icon = <MdOutlineBattery2Bar style={{ color: '#ffa940' }} />
  } else if (pct <= 55) {
    icon = <MdOutlineBattery3Bar style={{ color: '#ffd666' }} />
  } else if (pct <= 70) {
    icon = <MdOutlineBattery4Bar style={{ color: '#bae637' }} />
  } else if (pct <= 85) {
    icon = <MdOutlineBattery5Bar style={{ color: '#73d13d' }} />
  } else if (pct <= 99) {
    icon = <MdOutlineBattery6Bar style={{ color: '#52c41a' }} />
  } else {
    icon = <MdOutlineBatteryFull style={{ color: '#389e0d' }} />
  }
  return (
    <>
      <Button
        shape="circle"
        icon={icon}
        title={
          name
            ? `${name} Battery: ${batteryPercentage}%`
            : `Battery: ${batteryPercentage}%`
        }
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={name ? `${name} Battery Info` : 'Battery Info'}
      >
        <div style={{ textAlign: 'center', fontSize: 32, marginBottom: 16 }}>
          {icon}
        </div>
        <div style={{ textAlign: 'center', fontSize: 18 }}>
          {name && <div style={{ marginBottom: 8 }}>{name}</div>}
          <div>
            Battery:{' '}
            {batteryPercentage === -1 ? 'Unknown' : `${batteryPercentage}%`}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BatteryIcon
