const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Enable CSS imports for NativeWind
config.resolver.sourceExts.push("cjs");

module.exports = config;
