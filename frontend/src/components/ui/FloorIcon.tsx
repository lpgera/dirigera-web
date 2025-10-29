import React from "react";

interface FloorIconProps {
  totalFloors: number;
  floorOrder: number;
  isActive: boolean;
  size?: number;
}

export function FloorIcon({
  totalFloors,
  floorOrder,
  isActive,
  size = 48,
}: FloorIconProps) {
  const floorHeight = 6;
  const baseY = 8;

  const floors = Array.from({ length: totalFloors }, (_, i) => ({
    order: totalFloors - 1 - i,
    y: baseY + i * floorHeight,
    isThisFloor: totalFloors - 1 - i === floorOrder,
  }));

  const activeColor = "#1890ff";
  const inactiveColor = "#d9d9d9";
  const lineColor = "rgba(0,0,0,0.2)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginRight: 8,
      }}
    >
      {floors.map(({ order, y, isThisFloor }) => {
        const fillColor = isThisFloor
          ? isActive
            ? activeColor
            : inactiveColor
          : inactiveColor;
        const opacity = isThisFloor ? 1 : 0.4;

        return (
          <g key={order} opacity={opacity}>
            <path
              d={`M 24 ${y} L 36 ${y + 3} L 24 ${y + 6} L 12 ${y + 3} Z`}
              fill={fillColor}
              stroke={lineColor}
              strokeWidth="1"
            />
            <path
              d={`M 24 ${y + 6} L 36 ${y + 3} L 36 ${y + 7} L 24 ${y + 10} Z`}
              fill={fillColor}
              opacity="0.7"
              stroke={lineColor}
              strokeWidth="1"
            />
            <path
              d={`M 24 ${y + 6} L 12 ${y + 3} L 12 ${y + 7} L 24 ${y + 10} Z`}
              fill={fillColor}
              opacity="0.5"
              stroke={lineColor}
              strokeWidth="1"
            />
          </g>
        );
      })}
    </svg>
  );
}
