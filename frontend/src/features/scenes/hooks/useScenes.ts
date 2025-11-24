import { useQuery } from "@apollo/client/react";
import { NetworkStatus } from "@apollo/client";
import { SCENES_QUERY } from "../api/scenesApi";
import type { ScenesQuery } from "@/components/Scenes.types.gen";

export function useScenes() {
  const { data, networkStatus, error, refetch } = useQuery<ScenesQuery>(
    SCENES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  // Only show loading on initial fetch when we have no data yet
  const isInitialLoading = networkStatus === NetworkStatus.loading && !data;

  return {
    scenes: data?.scenes ?? [],
    loading: isInitialLoading,
    error,
    refetch,
  };
}
