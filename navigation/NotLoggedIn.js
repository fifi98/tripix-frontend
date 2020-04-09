import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/guest/Login";
import Register from "../screens/guest/Register";
import Activate from "../screens/guest/Activate";

const Stack = createStackNavigator();

const NotLoggedIn = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Activate" component={Activate} />
    </Stack.Navigator>
  );
};

export default NotLoggedIn;
