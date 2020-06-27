import React from 'react'
import { AccessoryType } from '../../../graphql.types'
import BatteryAccessory from './BatteryAccessory'
import Lightbulb from './Lightbulb'
import Plug from './Plug'

export type AccessoryProps = {
  id: number
  name: string
  type: AccessoryType
  alive: boolean
  dimmer?: number | null
  onOff?: boolean | null
  battery?: number | null
  colorTemperature?: number | null
}

type Props = AccessoryProps & {
  refetch: () => Promise<any>
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
}

const Accessory = ({
  alive,
  battery,
  colorTemperature,
  dimmer,
  id,
  isLoading,
  name,
  onLoadingChange,
  onOff,
  refetch,
  type,
}: Props) => {
  switch (type) {
    case AccessoryType.Remote:
    case AccessoryType.MotionSensor:
      return <BatteryAccessory name={name} battery={battery ?? 0} />
    case AccessoryType.Lightbulb:
      return (
        <Lightbulb
          id={id}
          name={name}
          alive={alive}
          dimmer={dimmer ?? 0}
          colorTemperature={colorTemperature ?? 0}
          refetch={refetch}
          isLoading={isLoading}
          onLoadingChange={onLoadingChange}
        />
      )
    case AccessoryType.Plug:
      return (
        <Plug
          id={id}
          name={name}
          alive={alive}
          onOff={onOff ?? false}
          refetch={refetch}
          isLoading={isLoading}
          onLoadingChange={onLoadingChange}
        />
      )
  }
  return null
}

export default Accessory
