import { gql } from "@apollo/client";

export const SCENES_QUERY = gql`
  query Scenes {
    scenes {
      id
      name
    }
  }
`;

export const ACTIVATE_SCENE_MUTATION = gql`
  mutation ActivateScene($id: String!) {
    activateScene(id: $id)
  }
`;
