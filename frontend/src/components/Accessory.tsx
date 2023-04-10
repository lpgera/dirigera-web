// import React, { useEffect, useState } from 'react'
// import { Col, Row, Slider, Switch } from 'antd'
// import { BsBatteryFull } from 'react-icons/bs'
// import { useMutation, gql } from '@apollo/client'
// import {
//   AccessoryColorTemperatureMutation,
//   AccessoryColorTemperatureMutationVariables,
//   AccessoryDimmerMutation,
//   AccessoryDimmerMutationVariables,
//   AccessoryHueMutation,
//   AccessoryHueMutationVariables,
//   AccessoryOnOffMutation,
//   AccessoryOnOffMutationVariables,
//   AccessorySaturationMutation,
//   AccessorySaturationMutationVariables,
// } from './Accessory.types.gen'
// import { AccessoryType } from '../graphql.types'
// import Color from './Color'
//
// export type AccessoryProps = {
//   id: number
//   name: string
//   type: AccessoryType
//   alive: boolean
//   dimmer?: number | null
//   onOff?: boolean | null
//   battery?: number | null
//   colorTemperature?: number | null
//   hue?: number | null
//   saturation?: number | null
// }
//
// type Props = AccessoryProps & {
//   isLoading: boolean
//   onLoadingChange: (isLoading: boolean) => void
// }
//
// const Accessory = ({
//   alive,
//   battery,
//   colorTemperature,
//   hue,
//   saturation,
//   dimmer,
//   id,
//   isLoading,
//   name,
//   onLoadingChange,
//   onOff,
//   type,
// }: Props) => {
//   const isSwitchable = [AccessoryType.Plug, AccessoryType.Lightbulb].includes(
//     type
//   )
//   const [dimmerValue, setDimmerValue] = useState(dimmer ?? null)
//   const [colorTemperatureValue, setColorTemperatureValue] = useState(
//     colorTemperature ?? null
//   )
//   const [hueValue, setHueValue] = useState(hue ?? null)
//   const [saturationValue, setSaturationValue] = useState(saturation ?? null)
//   useEffect(() => {
//     setDimmerValue(dimmer ?? null)
//   }, [dimmer])
//   useEffect(() => {
//     setColorTemperatureValue(colorTemperature ?? null)
//   }, [colorTemperature])
//   useEffect(() => {
//     setHueValue(hue ?? null)
//   }, [hue])
//   useEffect(() => {
//     setSaturationValue(saturation ?? null)
//   }, [saturation])
//
//   const [accessoryOnOff] = useMutation<
//     AccessoryOnOffMutation,
//     AccessoryOnOffMutationVariables
//   >(
//     gql`
//       mutation AccessoryOnOff($id: Int!, $onOff: Boolean!) {
//         accessoryOnOff(id: $id, onOff: $onOff)
//       }
//     `
//   )
//   const [accessoryDimmer] = useMutation<
//     AccessoryDimmerMutation,
//     AccessoryDimmerMutationVariables
//   >(
//     gql`
//       mutation AccessoryDimmer($id: Int!, $dimmer: Float!) {
//         accessoryDimmer(id: $id, dimmer: $dimmer)
//       }
//     `
//   )
//   const [accessoryColorTemperature] = useMutation<
//     AccessoryColorTemperatureMutation,
//     AccessoryColorTemperatureMutationVariables
//   >(gql`
//     mutation AccessoryColorTemperature($id: Int!, $colorTemperature: Float!) {
//       accessoryColorTemperature(id: $id, colorTemperature: $colorTemperature)
//     }
//   `)
//   const [accessoryHue] = useMutation<
//     AccessoryHueMutation,
//     AccessoryHueMutationVariables
//   >(gql`
//     mutation AccessoryHue($id: Int!, $hue: Float!) {
//       accessoryHue(id: $id, hue: $hue)
//     }
//   `)
//   const [accessorySaturation] = useMutation<
//     AccessorySaturationMutation,
//     AccessorySaturationMutationVariables
//   >(gql`
//     mutation AccessorySaturation($id: Int!, $saturation: Float!) {
//       accessorySaturation(id: $id, saturation: $saturation)
//     }
//   `)
//
//   return (
//     <>
//       <Row gutter={[8, 8]}>
//         <Col flex="auto">{name}</Col>
//         {battery !== null ? (
//           <Col flex="60px">
//             <BsBatteryFull style={{ verticalAlign: 'middle' }} /> {battery}%
//           </Col>
//         ) : null}
//       </Row>
//       <Row align="middle" gutter={[8, 8]}>
//         {isSwitchable ? (
//           <Col>
//             <Switch
//               style={{ marginTop: '9px', marginBottom: '9px' }}
//               size="small"
//               checked={onOff ?? false}
//               loading={isLoading}
//               disabled={!alive}
//               onChange={async (newValue) => {
//                 onLoadingChange(true)
//                 await accessoryOnOff({
//                   variables: { id, onOff: newValue },
//                 })
//                 onLoadingChange(false)
//               }}
//               title={`Toggle ${name}`}
//             />
//           </Col>
//         ) : null}
//         {dimmerValue !== null ? (
//           <Col flex="auto">
//             <Slider
//               min={0}
//               max={100}
//               value={dimmerValue}
//               disabled={isLoading || !alive}
//               onChange={(newValue: number) => setDimmerValue(newValue)}
//               onAfterChange={async (newValue: number) => {
//                 onLoadingChange(true)
//                 await accessoryDimmer({
//                   variables: { id, dimmer: newValue },
//                 })
//                 onLoadingChange(false)
//               }}
//             />
//           </Col>
//         ) : null}
//         {colorTemperatureValue !== null ? (
//           <Col flex="0">
//             <Color
//               colorTemperature={colorTemperatureValue}
//               hue={hueValue}
//               saturation={saturationValue}
//               disabled={isLoading || !alive}
//               onColorTemperatureChange={async (newValue) => {
//                 setColorTemperatureValue(newValue)
//                 await accessoryColorTemperature({
//                   variables: { id, colorTemperature: newValue },
//                 })
//               }}
//               onHueChange={async (newValue) => {
//                 setHueValue(newValue)
//                 await accessoryHue({
//                   variables: { id, hue: newValue },
//                 })
//               }}
//               onSaturationChange={async (newValue) => {
//                 setSaturationValue(newValue)
//                 await accessorySaturation({
//                   variables: { id, saturation: newValue },
//                 })
//               }}
//             />
//           </Col>
//         ) : null}
//       </Row>
//     </>
//   )
// }
//
// export default Accessory

export {}
