import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./Navigation/MainStackNavigator";
import { UsersProvider } from "./context/UsersContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RoutinesProvider } from "./context/RoutinesContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RoutinesProvider>
        <UsersProvider>
          <NavigationContainer
            theme={{
              colors: {
                background: "black",
              },
            }}
          >
            <SafeAreaView style={styles.container}>
              <MainStackNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </UsersProvider>
      </RoutinesProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

