#!/bin/bash

# Exit the script on any command with non-zero exit status
set -e

# Enable verbose mode to print each command before execution
set -x

# Path to the IPA file in the project directory
IPA_PATH="ipa/EasyPatientDynamic.ipa"

# Specify the simulator and app bundle identifier
SIMULATOR="iPhone 14"
APP_BUNDLE_ID="com.org.easyPatientTesting3"

echo "Booting the simulator..."
# Boot the simulator
if ! xcrun simctl boot "iPhone 14"; then
  echo "Failed to boot the simulator."
  exit 1
fi

echo "Checking simulator status..."
# Check simulator status
xcrun simctl list devices

echo "Installing the IPA..."
# Install the IPA on the simulator
if ! xcrun simctl install booted "$IPA_PATH"; then
  echo "Failed to install the IPA."
  exit 1
fi

echo "Launching the app..."
# Launch the app
if ! xcrun simctl launch booted "$APP_BUNDLE_ID"; then
  echo "Failed to launch the app."
  exit 1
fi

echo "Taking screenshots..."
# Take screenshots
SCREENSHOT_PATH="./screenshots"
mkdir -p "$SCREENSHOT_PATH"

# Specify the screens you want to capture
if ! xcrun simctl io booted screenshot "$SCREENSHOT_PATH/screen1.png"; then
  echo "Failed to take screenshot."
  exit 1
fi

# Add additional screenshots as needed
# Example:
# xcrun simctl io booted screenshot "$SCREENSHOT_PATH/screen2.png"

echo "Screenshots taken successfully."
