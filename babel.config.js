module.exports = function (api) {
  api.cache(true);
  const plugins = [['inline-import', { extensions: ['.sql'] }], 'react-native-reanimated/plugin'];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
