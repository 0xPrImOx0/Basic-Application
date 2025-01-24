const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// Get the default configuration from Expo
const config = getDefaultConfig(__dirname);

// Wrap the config with Reanimated Metro Config and NativeWind support
const wrappedConfig = wrapWithReanimatedMetroConfig(config);

// Export the final wrapped configuration
module.exports = withNativeWind(wrappedConfig, { input: "./global.css" });
