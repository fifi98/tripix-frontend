import React from "react";
import Home from "../screens/user/Home";
import FindNearby from "../screens/user/FindNearby";
import NewRoute from "../screens/routes/new/Where";
import PlannedRoutes from "../screens/routes/PlannedRoutes";
import FinishedRoutes from "../screens/routes/FinishedRoutes";
import SuggestedRoutes from "../screens/routes/SuggestedRoutes";
import Profile from "../screens/user/Profile";
import LandMarks from "../screens/routes/new/Landmarks";
import LandMarkDetails from "../screens/routes/new/LandmarkDetails";
import Trip from "../screens/routes/new/Trip";
import Start from "../screens/routes/new/Start";
import End from "../screens/routes/new/End";
import Overview from "../screens/routes/new/Overview";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked, faUser } from "@fortawesome/free-solid-svg-icons";
import { TransitionPresets } from "@react-navigation/stack";
import SuggestedRoutesCreated from "../screens/routes/SuggestedRoutesCreated";
import Statistics from "../screens/user/Statistics";
import Password from "../screens/user/Password";
import Email from "../screens/user/Email";

const StackModal = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Stats = createStackNavigator();

const StatsScreens = () => {
  return (
    <Stats.Navigator headerMode="none">
      <Stats.Screen name="Profile" component={Profile} />
      <Stats.Screen name="Statistics" component={Statistics} />
      <Stats.Screen name="Email" component={Email} />
      <Stats.Screen name="Password" component={Password} />
    </Stats.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#0A7DF2",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#161616",
          borderTopColor: "#3D3D3D",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faMapMarked} size={size} color={color} />,
        }}
        name="Routes"
        component={Home}
      />
      <Tab.Screen
        name="Profile"
        component={StatsScreens}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faUser} size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const UserScreens = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FindNearby" component={FindNearby} />
      <Stack.Screen name="PlannedRoutes" component={PlannedRoutes} />
      <Stack.Screen name="FinishedRoutes" component={FinishedRoutes} />
      <Stack.Screen name="SuggestedRoutes" component={SuggestedRoutes} />
      <Stack.Screen name="SuggestedRoutesCreated" component={SuggestedRoutesCreated} />
      <Stack.Screen name="NewRoute" component={NewRoute} />
      <Stack.Screen name="WhatVisit" component={LandMarks} />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="End" component={End} />
      <Stack.Screen name="Overview" component={Overview} />
      <Stack.Screen name="Trip" component={Trip} />
    </Stack.Navigator>
  );
};

const User = () => {
  return (
    <StackModal.Navigator
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      mode="modal"
      headerMode="none"
    >
      <StackModal.Screen name="Home" component={UserScreens} />
      <StackModal.Screen name="LandmarkDetails" component={LandMarkDetails} />
    </StackModal.Navigator>
  );
};

export default User;
