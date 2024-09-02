#!/bin/bash

# Path to the IPA file in the project directory
IPA_PATH="./ipa/EasyPatientDynamic.ipa"

# Specify the simulator and app bundle identifier
SIMULATOR="iPhone 14"
APP_BUNDLE_ID="com.org.easyPatientTesting3"

# Boot the simulator
xcrun simctl boot "$SIMULATOR"

# Install the IPA on the simulator
xcrun simctl install booted "$IPA_PATH"

# Launch the app
xcrun simctl launch booted "$APP_BUNDLE_ID"

# Take screenshots
SCREENSHOT_PATH="./screenshots"
mkdir -p "$SCREENSHOT_PATH"

# Specify the screens you want to capture
xcrun simctl io booted screenshot "$SCREENSHOT_PATH/screen1.png"
# Add additional screenshots as needed
