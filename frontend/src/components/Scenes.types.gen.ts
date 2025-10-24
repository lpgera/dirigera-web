import * as Types from "../graphql.types";

export type ScenesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ScenesQuery = {
  __typename?: "Query";
  scenes: Array<{ __typename?: "Scene"; id: string; name: string }>;
};

export type ActiveSceneMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type ActiveSceneMutation = {
  __typename?: "Mutation";
  activateScene?: string | null;
};
