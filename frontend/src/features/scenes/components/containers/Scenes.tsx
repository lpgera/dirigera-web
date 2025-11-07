import { Col } from "@/components/ui";
import { useScenes } from "../../hooks/useScenes";
import { useActivateScene } from "../../hooks/useActivateScene";
import { useSceneScopes } from "@/hooks/useSceneScopes";
import { useRefetch } from "@/hooks/useRefetch";
import { SceneButton } from "../ui/SceneButton";
import { ScenesList } from "../ui/ScenesList";

interface ScenesProps {
  scope?: "house" | "floor" | "room" | undefined;
  scopeId?: string | undefined;
  title?: string | undefined;
}

export function Scenes({ scope = "house", scopeId, title }: ScenesProps) {
  const { scenes, loading, refetch } = useScenes();
  const { activateScene, loading: activating } = useActivateScene();
  const {
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
    hasConfiguration,
    isScopeConfigured,
  } = useSceneScopes();

  useRefetch(refetch);

  // Determine which scenes to show
  let filteredScenes = scenes;

  if (hasConfiguration) {
    // Configuration file exists
    if (isScopeConfigured(scope, scopeId)) {
      // This scope is explicitly configured (even if empty array)
      let allowedSceneIds: string[] = [];

      if (scope === "house") {
        allowedSceneIds = getHouseScenes();
      } else if (scope === "floor" && scopeId) {
        allowedSceneIds = getFloorScenes(scopeId);
      } else if (scope === "room" && scopeId) {
        allowedSceneIds = getRoomScenes(scopeId);
      }

      filteredScenes = filterScenes(scenes, allowedSceneIds);
    } else {
      // This scope is not configured - show nothing
      filteredScenes = [];
    }
  }

  // Don't render if loading or no scenes to show
  if (loading || filteredScenes.length === 0) {
    return null;
  }

  const handleActivateScene = (sceneId: string) => {
    activateScene(sceneId);
  };

  return (
    <ScenesList title={title}>
      {filteredScenes.map((scene: { id: string; name: string }) => (
        <Col key={scene.id} xs={12} sm={8} md={6} lg={4}>
          <SceneButton
            name={scene.name}
            onClick={() => handleActivateScene(scene.id)}
            loading={activating}
          />
        </Col>
      ))}
    </ScenesList>
  );
}
