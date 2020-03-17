import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

const Stack = createStackNavigator();

StatusBar.setBarStyle("light-content", true);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {/* User not logged in */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* User logged in */}
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
