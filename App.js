import React from "react";
import { StatusBar } from "react-native";
import Provider from "./context/Provider";
import Navigator from "./navigation/Navigator";
import { enableScreens } from "react-native-screens";
// import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/dist/FontAwesome";

StatusBar.setBarStyle("light-content", true);
enableScreens();
// Icon.loadFont();
Icon2.loadFont();
const App: () => React$Node = () => {
  return (
    <Provider>
      <Navigator />
    </Provider>
  );
};

export default App;
