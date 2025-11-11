import type { Preview } from "@storybook/react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { MockedProvider } from "@apollo/client/testing/react";
import "../src/styles/global.css";

loadDevMessages();
loadErrorMessages();

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#1e1e1e" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "dark" },
  },
  decorators: [
    (Story, context) => (
      <MockedProvider mocks={context.parameters.mocks ?? []}>
        {Story()}
      </MockedProvider>
    ),
  ],
};

export default preview;
