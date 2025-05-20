#!/bin/bash

# Corregir conflicto entre plugins de aplicación y biblioteca
if [ -f "android/app/build.gradle" ]; then
  sed -i '/apply plugin: "com.android.library"/d' android/app/build.gradle
  sed -i '/apply plugin: "com.android.application"/d' android/app/build.gradle
  echo 'apply plugin: "com.android.application"' >> android/app/build.gradle
fi

# Asegurar configuración correcta en gradle.properties
echo "android.useAndroidX=true" > android/gradle.properties
echo "android.enableJetifier=true" >> android/gradle.properties
echo "org.gradle.jvmargs=-Xmx4608m" >> android/gradle.properties