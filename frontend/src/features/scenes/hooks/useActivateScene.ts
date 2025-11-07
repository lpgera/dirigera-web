import { useMutation } from "@apollo/client/react";
import { ACTIVATE_SCENE_MUTATION } from "../api/scenesApi";
import type { ActiveSceneMutation, ActiveSceneMutationVariables } from "@/components/Scenes.types.gen";

export function useActivateScene() {
  const [activateSceneMutation, { loading, error }] = useMutation<
    ActiveSceneMutation,
    ActiveSceneMutationVariables
  >(ACTIVATE_SCENE_MUTATION);

  const activateScene = (id: string) => {
    return activateSceneMutation({ variables: { id } });
  };

  return {
    activateScene,
    loading,
    error,
  };
}
