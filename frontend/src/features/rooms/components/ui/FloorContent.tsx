import "./FloorContent.css";

interface FloorContentProps {
  children: React.ReactNode;
}

export function FloorContent({ children }: FloorContentProps) {
  return <div className="floor-content">{children}</div>;
}
