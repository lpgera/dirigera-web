// import React, { useEffect, useState } from 'react'
// import { Card, Col, Collapse, Divider, Row, Slider, Switch } from 'antd'
// import { useMutation, gql } from '@apollo/client'
// import Accessory, { AccessoryProps } from './Accessory'
// import {
//   GroupColorTemperatureMutation,
//   GroupColorTemperatureMutationVariables,
//   GroupDimmerMutation,
//   GroupDimmerMutationVariables,
//   GroupHueMutation,
//   GroupHueMutationVariables,
//   GroupOnOffMutation,
//   GroupOnOffMutationVariables,
//   GroupSaturationMutation,
//   GroupSaturationMutationVariables,
// } from './Group.types.gen'
// import Color from './Color'
//
// type Props = {
//   id: number
//   name: string
//   accessories: AccessoryProps[]
//   isDeviceListDefaultOpen?: Boolean
// }
//
// const calculateGroupOnOff = (accessories: AccessoryProps[]) =>
//   accessories.some((a) => a.onOff)
//
// const calculateGroupAverage = (
//   accessories: AccessoryProps[],
//   property: 'dimmer' | 'colorTemperature' | 'hue' | 'saturation'
// ) => {
//   const values = accessories
//     .map((a) => a[property])
//     .filter((v) => v != null) as number[]
//
//   const sum = values.reduce((accumulator, v) => accumulator + v, 0)
//
//   if (values.length) {
//     return sum / values.length
//   }
//
//   return null
// }
//
// const Group = ({ accessories, id, name, isDeviceListDefaultOpen }: Props) => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [dimmer, setDimmer] = useState<number | null>(null)
//   const [onOff, setOnOff] = useState(false)
//   const [colorTemperature, setColorTemperature] = useState<number | null>(null)
//   const [hue, setHue] = useState<number | null>(null)
//   const [saturation, setSaturation] = useState<number | null>(null)
//   useEffect(() => {
//     setDimmer(calculateGroupAverage(accessories, 'dimmer'))
//     setOnOff(calculateGroupOnOff(accessories))
//     setColorTemperature(calculateGroupAverage(accessories, 'colorTemperature'))
//     setHue(calculateGroupAverage(accessories, 'hue'))
//     setSaturation(calculateGroupAverage(accessories, 'saturation'))
//   }, [accessories])
//
//   const [groupOnOff] = useMutation<
//     GroupOnOffMutation,
//     GroupOnOffMutationVariables
//   >(
//     gql`
//       mutation GroupOnOff($id: Int!, $onOff: Boolean!) {
//         groupOnOff(id: $id, onOff: $onOff)
//       }
//     `
//   )
//   const [groupDimmer] = useMutation<
//     GroupDimmerMutation,
//     GroupDimmerMutationVariables
//   >(gql`
//     mutation GroupDimmer($id: Int!, $dimmer: Float!) {
//       groupDimmer(id: $id, dimmer: $dimmer)
//     }
//   `)
//   const [groupColorTemperature] = useMutation<
//     GroupColorTemperatureMutation,
//     GroupColorTemperatureMutationVariables
//   >(gql`
//     mutation GroupColorTemperature($id: Int!, $colorTemperature: Float!) {
//       groupColorTemperature(id: $id, colorTemperature: $colorTemperature)
//     }
//   `)
//   const [groupHue] = useMutation<
//     GroupHueMutation,
//     GroupHueMutationVariables
//   >(gql`
//     mutation GroupHue($id: Int!, $hue: Float!) {
//       groupHue(id: $id, hue: $hue)
//     }
//   `)
//   const [groupSaturation] = useMutation<
//     GroupSaturationMutation,
//     GroupSaturationMutationVariables
//   >(gql`
//     mutation GroupSaturation($id: Int!, $saturation: Float!) {
//       groupSaturation(id: $id, saturation: $saturation)
//     }
//   `)
//
//   const aliveAccessories = accessories.filter((a) => a.alive)
//   const isGroupSwitchable = aliveAccessories.some((a) => a.onOff !== null)
//   const isGroupDimmable = aliveAccessories.some((a) => a.dimmer !== null)
//   const isGroupColorChangeable = aliveAccessories.some(
//     (a) => a.colorTemperature !== null
//   )
//
//   return (
//     <Card title={name}>
//       <Row align="middle" gutter={[8, 8]}>
//         <Col flex="0">
//           <Switch
//             size="small"
//             style={{ marginTop: '9px', marginBottom: '9px' }}
//             checked={onOff}
//             loading={isLoading}
//             disabled={!isGroupSwitchable}
//             onChange={async (newValue) => {
//               setIsLoading(true)
//               await groupOnOff({
//                 variables: { id, onOff: newValue },
//               })
//               setIsLoading(false)
//             }}
//             title={`Toggle ${name}`}
//           />
//         </Col>
//         {dimmer !== null ? (
//           <Col flex="auto">
//             <Slider
//               min={0}
//               max={100}
//               value={dimmer}
//               disabled={isLoading || !isGroupDimmable}
//               onChange={(newValue: number) => setDimmer(newValue)}
//               onAfterChange={async (newValue: number) => {
//                 setIsLoading(true)
//                 await groupDimmer({
//                   variables: { id, dimmer: newValue },
//                 })
//                 setIsLoading(false)
//               }}
//             />
//           </Col>
//         ) : null}
//         {colorTemperature !== null || hue !== null || saturation !== null ? (
//           <Col flex="0">
//             <Color
//               colorTemperature={colorTemperature}
//               hue={hue}
//               saturation={saturation}
//               disabled={isLoading || !isGroupColorChangeable}
//               onColorTemperatureChange={async (value) => {
//                 await groupColorTemperature({
//                   variables: {
//                     id,
//                     colorTemperature: value as number,
//                   },
//                 })
//               }}
//               onHueChange={async (value) => {
//                 await groupHue({
//                   variables: {
//                     id,
//                     hue: value as number,
//                   },
//                 })
//               }}
//               onSaturationChange={async (value) => {
//                 await groupSaturation({
//                   variables: {
//                     id,
//                     saturation: value as number,
//                   },
//                 })
//               }}
//             />
//           </Col>
//         ) : null}
//       </Row>
//       {accessories.length ? (
//         <Collapse
//           bordered={false}
//           style={{
//             marginLeft: '-24px',
//             marginRight: '-24px',
//             marginBottom: '-24px',
//             marginTop: '24px',
//           }}
//           defaultActiveKey={isDeviceListDefaultOpen ? [1] : undefined}
//         >
//           <Collapse.Panel header="Devices" key="1" style={{ border: 0 }}>
//             {accessories.map((accessory, index, array) => (
//               <React.Fragment key={accessory.id}>
//                 <Accessory
//                   {...accessory}
//                   isLoading={isLoading}
//                   onLoadingChange={(isLoading) => setIsLoading(isLoading)}
//                 />
//                 {index !== array.length - 1 ? <Divider /> : null}
//               </React.Fragment>
//             ))}
//           </Collapse.Panel>
//         </Collapse>
//       ) : null}
//     </Card>
//   )
// }
//
// export default Group

export {}
