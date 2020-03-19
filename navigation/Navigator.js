import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { MyContext } from "../context/Provider";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked, faUser } from "@fortawesome/free-solid-svg-icons";
import FindNearby from "../screens/FindNearby";
import NewRoute from "../screens/routes/NewRoute";
import PlannedRoutes from "../screens/routes/PlannedRoutes";
import FinishedRoutes from "../screens/routes/FinishedRoutes";
import SuggestedRoutes from "../screens/routes/SuggestedRoutes";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

const Navigator = () => {
  const colors = useContext(MyContext);

  console.log("aaa", colors);

  return (
    <NavigationContainer>
      <MyContext.Consumer>
        {context => {
          return (
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              {context.token === null ? (
                <>
                  <Stack.Screen name="Login" component={NotLoggedIn} />
                  {/* <Stack.Screen name="Register" component={Register} /> */}
                </>
              ) : (
                <>
                  <Stack.Screen name="Home" component={LoggedIn} />
                  {/* <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="FindNearby" component={FindNearby} />
                  <Stack.Screen name="NewRoute" component={NewRoute} />
                  <Stack.Screen name="PlannedRoutes" component={PlannedRoutes} />
                  <Stack.Screen name="FinishedRoutes" component={FinishedRoutes} />
                  <Stack.Screen name="SuggestedRoutes" component={SuggestedRoutes} />
                  <Stack.Screen name="Profile" component={Profile} /> */}
                </>
              )}
            </Stack.Navigator>
          );
        }}
      </MyContext.Consumer>
    </NavigationContainer>
  );
};

export default Navigator;
