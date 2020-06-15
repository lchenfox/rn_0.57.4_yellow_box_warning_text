#!/bin/sh

# If you execute this file without permission, please execute "chmod +x edit_modules.sh" (edit_modules.sh is this filename)

echo "....................👊👊👊👊................................"
echo "Great, begin to execute edit_modules script file automatically!"


# Fix bug: iOS, replace text using sed command so as to execute "react-native run-ios" command correctly
sed -i '' "
s/version.startsWith('iOS')/version.startsWith('com.apple.CoreSimulator.SimRuntime.iOS')/g;
s/version.startsWith('tvOS')/version.startsWith('com.apple.CoreSimulator.SimRuntime.tvOS')/g;
s/simulator.isAvailable !== 'YES'/simulator.isAvailable !== true/g;
" node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js

# Fix bug: iOS, running on iOS will crash (simulator). So must add "RCTReadString(input, "__attribute__((__unused__))")" to solve the problem
sed -i '' 's/return RCTReadString(input, "__unused") ||/& RCTReadString(input, "__attribute__((__unused__))") ||/g' node_modules/react-native/React/Base/RCTModuleMethod.mm

# Android, replace the following text with empty string
sed -i '' "s/Not recognized. Try again.//g" node_modules/react-native-touch-id/android/src/main/java/com/rnfingerprint/FingerprintHandler.java


echo "Great, execute edit_modules script file successfully!"
echo ".....................👊👊👊👊.............................."
