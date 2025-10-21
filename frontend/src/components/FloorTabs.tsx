import React, { useState, useEffect } from 'react'
import { Col, Row, Tabs } from 'antd'
import Scenes from './Scenes'
import RoomCard from './RoomCard'
import FloorIcon from './FloorIcon'
import { Floor } from '../useFloors'
import { Room } from '../graphql.types'

interface FloorTabsProps {
  groupedRooms: Map<string, { rooms: Room[] }>
  floors: Floor[]
  isDesktop: boolean
  columnSizes: Record<string, number>
}

const FloorTabs: React.FC<FloorTabsProps> = ({
  groupedRooms,
  floors,
  isDesktop,
  columnSizes,
}) => {
  const [activeFloorId, setActiveFloorId] = useState<string | null>(null)

  // Set initial active tab when floors are loaded
  useEffect(() => {
    if (floors && floors.length > 0 && !activeFloorId) {
      setActiveFloorId(floors[0].id)
    }
  }, [floors, activeFloorId])

  return (
    <Tabs
      activeKey={activeFloorId || undefined}
      onChange={(key) => setActiveFloorId(key)}
      tabPosition={isDesktop ? 'left' : 'top'}
      items={floors.map((floor) => {
        const floorData = groupedRooms.get(floor.id)
        const floorRooms = floorData?.rooms || []

        return {
          key: floor.id,
          label: (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isDesktop ? '8px 4px' : '4px 8px',
              }}
            >
              <FloorIcon
                totalFloors={floors.length}
                floorOrder={floor.order}
                isActive={floor.id === activeFloorId}
                size={isDesktop ? 48 : 40}
              />
              <span>{floor.name}</span>
            </div>
          ),
          children: (
            <>
              {/* Floor-level scenes */}
              <Scenes scope="floor" scopeId={floor.id} />

              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                {floorRooms.map((room) => (
                  <Col key={room.id} {...columnSizes}>
                    <RoomCard room={room} />
                  </Col>
                ))}
              </Row>
            </>
          ),
        }
      })}
      style={{
        minHeight: isDesktop ? 500 : 'auto',
      }}
    />
  )
}

export default FloorTabs
