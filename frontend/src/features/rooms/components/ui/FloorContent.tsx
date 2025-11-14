import "./FloorContent.css";

interface FloorContentProps {
  children: React.ReactNode;
}

/**
 * Simple wrapper component for floor content styling.
 * Use composition to pass scenes and room cards as children.
 */
export function FloorContent({ children }: FloorContentProps) {
  return <div className="floor-content">{children}</div>;
}
