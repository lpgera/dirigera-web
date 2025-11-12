import "./PlayItemDisplay.css";

export interface PlayItemDisplayProps {
  playItem?: string | null | undefined;
  nextPlayItem?: string | null | undefined;
}

export function PlayItemDisplay({
  playItem,
  nextPlayItem,
}: PlayItemDisplayProps) {
  if (!playItem && !nextPlayItem) {
    return null;
  }

  return (
    <div className="play-item-display">
      {playItem && (
        <div className="play-item-display-row">
          <span className="play-item-display-label">Now playing:</span>
          <span className="play-item-display-value">{playItem}</span>
        </div>
      )}
      {nextPlayItem && (
        <div className="play-item-display-row">
          <span className="play-item-display-label">Next:</span>
          <span className="play-item-display-value">{nextPlayItem}</span>
        </div>
      )}
    </div>
  );
}
