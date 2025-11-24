import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ACTIVATE_SCENE_MUTATION } from "../api/scenesApi";
import type {
  ActiveSceneMutation,
  ActiveSceneMutationVariables,
} from "@/components/Scenes.types.gen";

export function useActivateScene() {
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [activateSceneMutation, { loading, error }] = useMutation<
    ActiveSceneMutation,
    ActiveSceneMutationVariables
  >(ACTIVATE_SCENE_MUTATION);

  const activateScene = async (id: string) => {
    setActiveSceneId(id);
    try {
      await activateSceneMutation({ variables: { id } });
    } finally {
      setActiveSceneId(null);
    }
  };

  return {
    activateScene,
    activeSceneId,
    loading,
    error,
  };
}
