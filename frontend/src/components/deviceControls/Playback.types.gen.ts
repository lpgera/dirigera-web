import * as Types from "../../graphql.types";

export type SetPlaybackMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  type: Types.ControlType;
  playback: Types.Playback;
}>;

export type SetPlaybackMutation = {
  __typename?: "Mutation";
  setPlayback?: boolean | null;
};
