import React from "react";
import Provider from "./context/Provider";
import Navigator from "./navigation/Navigator";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { StatusBar } from "react-native";

StatusBar.setBarStyle("light-content", true);
Icon.loadFont();

const App: () => React$Node = () => {
  return (
    <Provider>
      <Navigator />
    </Provider>
  );
};

export default App;
