export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', 'storybook-addon-remix-react-router'],
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
