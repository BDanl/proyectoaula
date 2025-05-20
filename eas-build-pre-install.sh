#!/bin/bash

# Solución radical para conflictos de plugins
echo "Reconstruyendo configuración de Android..."

# 1. Limpiar configuración existente
rm -rf android/app/build.gradle

# 2. Crear nuevo build.gradle con configuración mínima
cat > android/app/build.gradle << 'EOL'
apply plugin: "com.android.application"
apply plugin: "com.facebook.react"

react {
    root = file("../../")
}

android {
    compileSdkVersion 33
    buildToolsVersion "33.0.0"

    defaultConfig {
        applicationId "com.daniel.bovea.firetive"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    implementation project(':expo')
}
EOL

# 3. Forzar versión compatible de Kotlin
echo "android.ext.kotlinVersion=1.7.0" > android/gradle.properties
echo "android.useAndroidX=true" >> android/gradle.properties
echo "android.enableJetifier=true" >> android/gradle.properties

# 4. Corregir autolinking
if [ -f "node_modules/expo-modules-autolinking/scripts/android/autolinking_implementation.gradle" ]; then
    sed -i "s/apply plugin: 'com.android.library'//g" node_modules/expo-modules-autolinking/scripts/android/autolinking_implementation.gradle
fi