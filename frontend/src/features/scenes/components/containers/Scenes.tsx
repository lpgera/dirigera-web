import { useMemo } from "react";
import { useScenes } from "../../hooks/useScenes";
import { useActivateScene } from "../../hooks/useActivateScene";
import { useSceneScopes } from "@/hooks/useSceneScopes";
import { useRefetch } from "@/hooks/useRefetch";
import { Skeleton, Col } from "@/components/ui";
import { ScenesUI } from "../ui/ScenesUI";
import { ScenesList } from "../ui/ScenesList";

interface ScenesProps {
  scope?: "house" | "floor" | "room" | undefined;
  scopeId?: string | undefined;
  title?: string | undefined;
  wrapScenes?: boolean | undefined;
}

export function Scenes({
  scope = "house",
  scopeId,
  title,
  wrapScenes = true,
}: ScenesProps) {
  const { scenes, loading, refetch } = useScenes();
  const { activateScene, activeSceneId } = useActivateScene();
  const {
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
    hasConfiguration,
    isScopeConfigured,
  } = useSceneScopes();

  useRefetch(refetch);

  // Determine which scenes to show - memoized to prevent unnecessary re-renders
  const filteredScenes = useMemo(() => {
    if (!hasConfiguration) {
      return scenes;
    }

    // Configuration file exists
    if (!isScopeConfigured(scope, scopeId)) {
      // This scope is not configured - show nothing
      return [];
    }

    // This scope is explicitly configured (even if empty array)
    let allowedSceneIds: string[] = [];

    if (scope === "house") {
      allowedSceneIds = getHouseScenes();
    } else if (scope === "floor" && scopeId) {
      allowedSceneIds = getFloorScenes(scopeId);
    } else if (scope === "room" && scopeId) {
      allowedSceneIds = getRoomScenes(scopeId);
    }

    return filterScenes(scenes, allowedSceneIds);
  }, [
    scenes,
    hasConfiguration,
    scope,
    scopeId,
    isScopeConfigured,
    getHouseScenes,
    getFloorScenes,
    getRoomScenes,
    filterScenes,
  ]);

  // Show skeleton while loading
  if (loading) {
    return (
      <ScenesList title={title} wrapScenes={wrapScenes}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ height: "40px" }}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
        ))}
      </ScenesList>
    );
  }

  const handleActivateScene = (sceneId: string) => {
    activateScene(sceneId);
  };

  return (
    <ScenesUI
      scenes={filteredScenes}
      title={title}
      onActivateScene={handleActivateScene}
      activeSceneId={activeSceneId}
      wrapScenes={wrapScenes}
    />
  );
}
