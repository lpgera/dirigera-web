import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./PlaybackControl.css";

export interface PlaybackControlProps {
  playback: string;
  playbackNextAvailable?: boolean | null | undefined;
  playbackPreviousAvailable?: boolean | null | undefined;
  isReachable: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  loading?: boolean;
}

export function PlaybackControl({
  playback,
  playbackNextAvailable = true,
  playbackPreviousAvailable = true,
  isReachable,
  onPlayPause,
  onPrevious,
  onNext,
  loading = false,
}: PlaybackControlProps) {
  const isPlaying = playback === "playbackPlaying";
  const isBuffering = playback === "playbackBuffering";

  return (
    <div className="playback-control">
      <button
        className="playback-control-button"
        disabled={!isReachable || !playbackPreviousAvailable || loading}
        onClick={onPrevious}
        aria-label="Previous"
      >
        <StepBackwardOutlined />
      </button>

      <button
        className="playback-control-button playback-control-button-primary"
        disabled={!isReachable || loading}
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isBuffering ? (
          <LoadingOutlined spin />
        ) : isPlaying ? (
          <PauseCircleOutlined />
        ) : (
          <PlayCircleOutlined />
        )}
      </button>

      <button
        className="playback-control-button"
        disabled={!isReachable || !playbackNextAvailable || loading}
        onClick={onNext}
        aria-label="Next"
      >
        <StepForwardOutlined />
      </button>
    </div>
  );
}
