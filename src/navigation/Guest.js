import React from "react";
import Login from "../screens/guest/Login";
import Register from "../screens/guest/Register";
import Activate from "../screens/guest/Activate";
import ForgottenPassword from "../screens/guest/ForgottenPassword";
import ResetPassword from "../screens/guest/ResetPassword";
import NewPassword from "../screens/guest/NewPassword";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Guest = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Activate" component={Activate} />
      <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default Guest;
