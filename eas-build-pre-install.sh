#!/bin/bash

# Fix para expo-firebase-core
if [ -f "node_modules/expo-firebase-core/android/build.gradle" ]; then
  sed -i '/androidSourcesJar {/,/}/ {/classifier/d}' node_modules/expo-firebase-core/android/build.gradle
fi

# Fix para expo-modules-core
if [ -f "node_modules/expo-modules-core/android/ExpoModulesCorePlugin.gradle" ]; then
  sed -i 's/components\.release/components\.default/' node_modules/expo-modules-core/android/ExpoModulesCorePlugin.gradle
fi

# Asegurar versión correcta de Kotlin
echo "android.ext.kotlinVersion = \"1.7.0\"" > android/gradle.properties