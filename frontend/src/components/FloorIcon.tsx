import React from 'react'

interface FloorIconProps {
  totalFloors: number // Total number of floors in building
  floorOrder: number // This floor's order (0 = bottom)
  isActive: boolean // Whether this tab is currently active
  size?: number
}

/**
 * Simple isometric building icon showing all floors with current floor highlighted
 * Floors stack from bottom (order 0) to top
 */
const FloorIcon: React.FC<FloorIconProps> = ({
  totalFloors,
  floorOrder,
  isActive,
  size = 48,
}) => {
  // Height of each floor layer
  const floorHeight = 6
  const baseY = 8 // Starting Y position for top floor

  // Calculate Y position for each floor (top to bottom in SVG = bottom to top visually)
  const floors = Array.from({ length: totalFloors }, (_, i) => ({
    order: totalFloors - 1 - i, // Reverse so order 0 is at bottom
    y: baseY + i * floorHeight,
    isThisFloor: totalFloors - 1 - i === floorOrder,
  }))

  // Colors
  const activeColor = '#1890ff' // Bright blue for active floor
  const inactiveColor = '#d9d9d9' // Gray for inactive floors
  const lineColor = 'rgba(0,0,0,0.2)' // Line color

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: 8,
      }}
    >
      {/* Render all floors from bottom to top */}
      {floors.map(({ order, y, isThisFloor }) => {
        const fillColor = isThisFloor && isActive ? activeColor : inactiveColor
        const opacity = isThisFloor && isActive ? 1 : 0.5

        return (
          <g key={order} opacity={opacity}>
            {/* Top face */}
            <path
              d={`M 24 ${y} L 36 ${y + 3} L 24 ${y + 6} L 12 ${y + 3} Z`}
              fill={fillColor}
              stroke={lineColor}
              strokeWidth="1"
            />

            {/* Right face */}
            <path
              d={`M 24 ${y + 6} L 36 ${y + 3} L 36 ${y + 7} L 24 ${y + 10} Z`}
              fill={fillColor}
              opacity="0.7"
              stroke={lineColor}
              strokeWidth="1"
            />

            {/* Left face */}
            <path
              d={`M 24 ${y + 6} L 12 ${y + 3} L 12 ${y + 7} L 24 ${y + 10} Z`}
              fill={fillColor}
              opacity="0.5"
              stroke={lineColor}
              strokeWidth="1"
            />
          </g>
        )
      })}
    </svg>
  )
}

export default FloorIcon
