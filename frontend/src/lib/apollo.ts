import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_BASE_URL } from "@/config/api";

const cache = new InMemoryCache();

export function createApolloClient(
  token: string | null,
  onAuthError: () => void
) {
  return new ApolloClient({
    link: ApolloLink.from([
      new ErrorLink(({ error }) => {
        if (
          CombinedGraphQLErrors.is(error) &&
          error.errors?.some((err) =>
            err.message.includes(
              "You must be logged in to access this resource."
            )
          )
        ) {
          onAuthError();
        }
        console.error(error);
      }),
      new HttpLink({
        uri: API_BASE_URL,
        credentials: "same-origin",
        headers: {
          "x-token": token ?? "",
        },
      }),
    ]),
    cache,
  });
}

export { cache };
