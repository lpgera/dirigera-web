import * as Types from "../../graphql.types";

export type SetIsOnMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  type: Types.ControlType;
  isOn: Types.Scalars["Boolean"]["input"];
}>;

export type SetIsOnMutation = {
  __typename?: "Mutation";
  setIsOn?: boolean | null;
};
