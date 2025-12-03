import { Col } from "@/components/ui";
import { SceneButton } from "./SceneButton";
import { ScenesList } from "./ScenesList";

interface ScenesUIProps {
  scenes: Array<{ id: string; name: string }>;
  title?: string | undefined;
  onActivateScene: (sceneId: string) => void;
  activeSceneId?: string | null;
  wrapScenes?: boolean | undefined;
}

export function ScenesUI({
  scenes,
  title,
  onActivateScene,
  activeSceneId,
  wrapScenes = true,
}: ScenesUIProps) {
  if (scenes.length === 0) {
    return null;
  }

  return (
    <ScenesList title={title} wrapScenes={wrapScenes}>
      {scenes.map((scene) => (
        <Col key={scene.id}>
          <SceneButton
            name={scene.name}
            onClick={() => onActivateScene(scene.id)}
            loading={activeSceneId === scene.id}
          />
        </Col>
      ))}
    </ScenesList>
  );
}
