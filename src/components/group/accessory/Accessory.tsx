import React from 'react'
import { AccessoryType } from '../../../graphql.types'
import BatteryAccessory from './BatteryAccessory'
import Lightbulb from './Lightbulb'
import Plug from './Plug'

export type AccessoryProps = {
  id: number
  name: string
  type: AccessoryType
  dimmer?: number | null
  onOff?: boolean | null
  battery?: number | null
}

type Props = AccessoryProps & {
  refetch: () => Promise<any>
  isLoading: boolean
  onLoadingChange: (isLoading: boolean) => void
}

const Accessory = (props: Props) => {
  switch (props.type) {
    case AccessoryType.Remote:
    case AccessoryType.MotionSensor:
      return <BatteryAccessory name={props.name} battery={props.battery ?? 0} />
    case AccessoryType.Lightbulb:
      return (
        <Lightbulb
          id={props.id}
          name={props.name}
          dimmer={props.dimmer ?? 0}
          refetch={props.refetch}
          isLoading={props.isLoading}
          onLoadingChange={props.onLoadingChange}
        />
      )
    case AccessoryType.Plug:
      return (
        <Plug
          id={props.id}
          name={props.name}
          onOff={props.onOff ?? false}
          refetch={props.refetch}
          isLoading={props.isLoading}
          onLoadingChange={props.onLoadingChange}
        />
      )
  }
  return null
}

export default Accessory
