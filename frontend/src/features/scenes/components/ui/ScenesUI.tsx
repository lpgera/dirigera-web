import { Col } from "@/components/ui";
import { SceneButton } from "./SceneButton";
import { ScenesList } from "./ScenesList";

interface ScenesUIProps {
  scenes: Array<{ id: string; name: string }>;
  title?: string | undefined;
  onActivateScene: (sceneId: string) => void;
  loading?: boolean;
}

export function ScenesUI({
  scenes,
  title,
  onActivateScene,
  loading,
}: ScenesUIProps) {
  if (scenes.length === 0) {
    return null;
  }

  return (
    <ScenesList title={title}>
      {scenes.map((scene) => (
        <Col key={scene.id} xs={12} sm={8} md={6} lg={4}>
          <SceneButton
            name={scene.name}
            onClick={() => onActivateScene(scene.id)}
            loading={loading}
          />
        </Col>
      ))}
    </ScenesList>
  );
}
