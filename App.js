import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked, faUser } from "@fortawesome/free-solid-svg-icons";
import { colors } from "./constants/theme";
import FindNearby from "./screens/FindNearby";
import NewRoute from "./screens/routes/NewRoute";
import PlannedRoutes from "./screens/routes/PlannedRoutes";
import FinishedRoutes from "./screens/routes/FinishedRoutes";
import SuggestedRoutes from "./screens/routes/SuggestedRoutes";
import MyProvider from "./context/Provider";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

StatusBar.setBarStyle("light-content", true);

const Nekaj = () => {
  return (
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
      <Stack.Screen name="FindNearby" component={FindNearby} />
      <Stack.Screen name="NewRoute" component={NewRoute} />
      <Stack.Screen name="PlannedRoutes" component={PlannedRoutes} />
      <Stack.Screen name="FinishedRoutes" component={FinishedRoutes} />
      <Stack.Screen name="SuggestedRoutes" component={SuggestedRoutes} />
    </Stack.Navigator>
  );
};

export default function App() {
  const loggedIn = true;

  return (
    <MyProvider>
      <NavigationContainer>
        {loggedIn ? (
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: "#0A7DF2",
              inactiveTintColor: "gray",
              style: {
                backgroundColor: "#161616"
              }
            }}
          >
            <Tab.Screen
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faMapMarked} style={styles.icon} size={size} color={color} />
                )
              }}
              name="Routes"
              component={Nekaj}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faUser} style={styles.icon} size={size} color={color} />
                )
              }}
            />
          </Tab.Navigator>
        ) : (
          <Nekaj />
        )}
      </NavigationContainer>
    </MyProvider>
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
