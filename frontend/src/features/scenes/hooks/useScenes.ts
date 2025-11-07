import { useQuery } from "@apollo/client/react";
import { SCENES_QUERY } from "../api/scenesApi";
import type { ScenesQuery } from "@/components/Scenes.types.gen";

export function useScenes() {
  const { data, loading, error, refetch } = useQuery<ScenesQuery>(SCENES_QUERY);

  return {
    scenes: data?.scenes ?? [],
    loading,
    error,
    refetch,
  };
}
