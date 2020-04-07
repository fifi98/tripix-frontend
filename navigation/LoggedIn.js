import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/user/Home";
import Profile from "../screens/user/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked, faUser } from "@fortawesome/free-solid-svg-icons";
import FindNearby from "../screens/user/FindNearby";
import NewRoute from "../screens/routes/NewRoute";
import PlannedRoutes from "../screens/routes/PlannedRoutes";
import FinishedRoutes from "../screens/routes/FinishedRoutes";
import SuggestedRoutes from "../screens/routes/SuggestedRoutes";
import { TransitionPresets } from "@react-navigation/stack";
import WhatVisit from "../screens/routes/WhatVisit";
import LandMarkDetails from "../screens/routes/LandmarkDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Homea = () => {
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
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={faUser} size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const LoggedIn = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
      }}
    >
      <Stack.Screen name="Home" component={Homea} />
      <Stack.Screen name="FindNearby" component={FindNearby} />

      <Stack.Screen name="PlannedRoutes" component={PlannedRoutes} />
      <Stack.Screen name="FinishedRoutes" component={FinishedRoutes} />
      <Stack.Screen name="SuggestedRoutes" component={SuggestedRoutes} />

      <Stack.Screen name="NewRoute" component={NewRoute} />
      <Stack.Screen name="WhatVisit" component={WhatVisit} />

      <Stack.Screen
        name="LandmarkDetails"
        component={LandMarkDetails}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
        mode="modal"
      />
    </Stack.Navigator>
  );
};

export default LoggedIn;
