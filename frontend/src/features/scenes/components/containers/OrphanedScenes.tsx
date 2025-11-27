import { useMemo } from "react";
import { useScenes } from "../../hooks/useScenes";
import { useActivateScene } from "../../hooks/useActivateScene";
import { useSceneScopes } from "@/hooks/useSceneScopes";
import { useRefetch } from "@/hooks/useRefetch";
import { Skeleton } from "@/components/ui";
import { ScenesUI } from "../ui/ScenesUI";
import { ScenesList } from "../ui/ScenesList";
import type { Scene } from "@/graphql.types";

interface OrphanedScenesProps {
  title?: string;
  wrapScenes?: boolean;
}

/**
 * Displays scenes that are not assigned to any scope (house, floor, or room).
 * Only shows scenes when a scenes.config.json exists and some scenes are not configured.
 */
export function OrphanedScenes({
  title,
  wrapScenes = true,
}: OrphanedScenesProps) {
  const { scenes, loading, refetch } = useScenes();
  const { activateScene, activeSceneId } = useActivateScene();
  const { getAllConfiguredSceneIds, hasConfiguration } = useSceneScopes();

  useRefetch(refetch);

  // Get orphaned scenes
  const orphanedScenes = useMemo(() => {
    if (!hasConfiguration) {
      // No configuration file - no orphaned scenes
      return [];
    }
    const configuredIds = getAllConfiguredSceneIds();
    return scenes.filter((scene: Scene) => !configuredIds.has(scene.id));
  }, [scenes, hasConfiguration, getAllConfiguredSceneIds]);

  // Show skeleton while loading
  if (loading) {
    return (
      <ScenesList title={title} wrapScenes={wrapScenes}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ height: "40px" }}>
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
        ))}
      </ScenesList>
    );
  }

  // Don't render anything if no orphaned scenes
  if (orphanedScenes.length === 0) {
    return null;
  }

  const handleActivateScene = (sceneId: string) => {
    activateScene(sceneId);
  };

  return (
    <ScenesUI
      scenes={orphanedScenes}
      title={title}
      onActivateScene={handleActivateScene}
      activeSceneId={activeSceneId}
      wrapScenes={wrapScenes}
    />
  );
}
