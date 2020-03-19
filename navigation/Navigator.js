import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyContext } from "../context/Provider";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";

const Navigator = () => {
  return (
    <NavigationContainer>
      <MyContext.Consumer>{context => (context.token === null ? <NotLoggedIn /> : <LoggedIn />)}</MyContext.Consumer>
    </NavigationContainer>
  );
};

export default Navigator;
