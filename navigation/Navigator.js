import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyContext } from "../context/Provider";
import Guest from "./Guest";
import User from "./User";

const Stack = createStackNavigator();

const Navigator = () => {
  const { user } = useContext(MyContext);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {user.token === null ? <Stack.Screen name="Login" component={Guest} /> : <Stack.Screen name="Home" component={User} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
