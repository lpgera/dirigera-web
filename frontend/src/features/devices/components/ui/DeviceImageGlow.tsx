import "./DeviceImageGlow.css";

export interface DeviceImageGlowProps {
  showGlow: boolean;
  color: string;
  percentage: number;
  orientation: "vertical" | "horizontal";
}

export function DeviceImageGlow({
  showGlow,
  color,
  percentage,
  orientation,
}: DeviceImageGlowProps) {
  const opacity = (24 + percentage * 0.6) / 100;
  const isVertical = orientation === "vertical";
  const radius = `calc(var(--device-image-border-radius) + var(--device-image-border-width))`;
  return (
    <>
      <div
        className="device-image-glow"
        style={{
          boxShadow: showGlow
            ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`
            : "none",
          backgroundColor: "transparent",
          borderTopLeftRadius: !isVertical
            ? radius
            : percentage < 80
              ? 0
              : radius,
          borderTopRightRadius: percentage < 80 ? 0 : radius,
          borderBottomRightRadius: isVertical
            ? radius
            : percentage < 80
              ? 0
              : radius,
          opacity,
          height: isVertical
            ? `calc((100%  + var(--device-image-border-width) * 2 ) * ${percentage / 100})`
            : undefined,
          width: !isVertical
            ? `calc((100%  + var(--device-image-border-width) * 2 ) * ${percentage / 100})`
            : undefined,
        }}
      />
      <div className="device-image-border">
        {showGlow && (
          <div
            className="device-image-border-inner"
            style={{
              backgroundColor: color,
              opacity:
                percentage !== undefined
                  ? (40 + (percentage ?? 0) * 0.6) / 100
                  : 1,
              height: isVertical
                ? `${percentage !== undefined ? Math.max(percentage, 20) : 0}%`
                : undefined,
              width: !isVertical
                ? `${percentage !== undefined ? Math.max(percentage, 20) : 0}%`
                : undefined,
            }}
          />
        )}
      </div>
    </>
  );
}
