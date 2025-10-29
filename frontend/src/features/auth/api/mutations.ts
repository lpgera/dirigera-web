import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($password: String!) {
    login(password: $password)
  }
`;
