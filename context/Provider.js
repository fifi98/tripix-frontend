import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const MyContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({
    token: "",
    saveToken: async (userToken) => {
      try {
        const resp = await AsyncStorage.setItem("userToken", userToken);
        setUser({ ...user, token: userToken });
        return resp;
      } catch (error) {
        setUser({ error });
      }
    },
    removeToken: async () => {
      try {
        const resp = await AsyncStorage.removeItem("userToken");
        setUser({ ...user, token: null });
        return resp;
      } catch (error) {
        setUser({ error });
      }
    },
    getToken: async () => {
      try {
        const resp = await AsyncStorage.getItem("userToken");
        return resp;
      } catch (error) {
        setUser({ error });
      }
    },
    selectedLandmarks: [],
  });

  const value = { user, setUser };

  useEffect(() => {
    //Put the token from asyncstorage to the state when app loads
    AsyncStorage.getItem("userToken")
      .then((token) => {
        setUser({ ...user, token: token });
      })
      .catch((error) => {
        setUser({ ...user, error: error });
      });
  }, []);

  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>;
};

export default Provider;
