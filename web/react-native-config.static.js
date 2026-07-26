// Used only by @tamagui/static's node-side esbuild config bundler (see patches/@tamagui+static+*.patch).
// That bundler runs in the same Node process as `webpack.config.js`, which already calls
// `require('dotenv').config()`, so `process.env` already carries everything from `.env`.
export default (typeof process !== 'undefined' && process.env) || {};
