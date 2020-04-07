import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyContext } from "../context/Provider";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";

const Stack = createStackNavigator();

const Navigator = () => {
  const { user } = React.useContext(MyContext);

  return (
    <NavigationContainer>
      <MyContext.Consumer>
        {(context) => {
          return (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {context.user.token === null ? (
                <Stack.Screen name="Login" component={NotLoggedIn} />
              ) : (
                <Stack.Screen name="Home" component={LoggedIn} />
              )}
            </Stack.Navigator>
          );
        }}
      </MyContext.Consumer>
    </NavigationContainer>
  );
};

export default Navigator;
