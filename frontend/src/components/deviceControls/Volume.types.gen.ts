import * as Types from "../../graphql.types";

export type SetVolumeMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  type: Types.ControlType;
  volume: Types.Scalars["Int"]["input"];
}>;

export type SetVolumeMutation = {
  __typename?: "Mutation";
  setVolume?: boolean | null;
};
