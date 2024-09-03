#!/bin/bash

# Exit the script on any command with non-zero exit status
set -e

# Enable verbose mode to print each command before execution
set -x

# Path to the existing .app file
APP_PATH="$(pwd)/ios/build/DerivedData/Build/Products/Debug-iphonesimulator/EasyPatientDynamic.app"

# Specify the simulator and app bundle identifier
SIMULATOR_NAME="iPhone 14"
SIMULATOR_UDID=$(xcrun simctl list devices | grep "$SIMULATOR_NAME" | grep -oE "[0-9A-F-]{36}")
APP_BUNDLE_ID="com.org.easyPatientTesting3"

# Check if the .app file exists
if [ ! -d "$APP_PATH" ]; then
  echo ".app file not found at $APP_PATH"
  exit 1
fi

# Boot the simulator
if ! xcrun simctl boot "$SIMULATOR_UDID"; then
  echo "Failed to boot the simulator."
  exit 1
fi

# Install the .app on the simulator
if ! xcrun simctl install booted "$APP_PATH"; then
  echo "Failed to install the app."
  exit 1
fi

# Launch the app
if ! xcrun simctl launch booted "$APP_BUNDLE_ID"; then
  echo "Failed to launch the app."
  exit 1
fi

# Take screenshots
SCREENSHOT_PATH="./screenshots"
mkdir -p "$SCREENSHOT_PATH"

# Specify the screens you want to capture
if ! xcrun simctl io booted screenshot "$SCREENSHOT_PATH/screen1.png"; then
  echo "Failed to take screenshot."
  exit 1
fi

# Additional screenshots can be captured similarly
# Example: xcrun simctl io booted screenshot "$SCREENSHOT_PATH/screen2.png"

echo "Screenshots taken successfully."
