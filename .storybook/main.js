module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    '@storybook/preset-create-react-app',
    'storybook-addon-apollo-client',
  ],
  core: {
    builder: 'webpack5',
  },
}
