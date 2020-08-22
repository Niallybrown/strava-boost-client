// eslint-disable-next-line
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

/* config-overrides.js */
module.exports = function override(config, env) {
  // eslint-disable-next-line
  config = rewireReactHotLoader(config, env);
  return config;
};
