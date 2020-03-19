import React from "react";
import { StatusBar } from "react-native";
import MyProvider from "./context/Provider";
import Navigator from "./navigation/Navigator";

StatusBar.setBarStyle("light-content", true);

export default function App() {
  return (
    <MyProvider>
      <Navigator />
    </MyProvider>
  );
}
