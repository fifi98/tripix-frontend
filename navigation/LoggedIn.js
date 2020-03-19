import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked, faUser } from "@fortawesome/free-solid-svg-icons";
import FindNearby from "../screens/FindNearby";
import NewRoute from "../screens/routes/NewRoute";
import PlannedRoutes from "../screens/routes/PlannedRoutes";
import FinishedRoutes from "../screens/routes/FinishedRoutes";
import SuggestedRoutes from "../screens/routes/SuggestedRoutes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Nekaj = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FindNearby" component={FindNearby} />
      <Stack.Screen name="NewRoute" component={NewRoute} />
      <Stack.Screen name="PlannedRoutes" component={PlannedRoutes} />
      <Stack.Screen name="FinishedRoutes" component={FinishedRoutes} />
      <Stack.Screen name="SuggestedRoutes" component={SuggestedRoutes} />
    </Stack.Navigator>
  );
};

const LoggedIn = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoggedIn;
