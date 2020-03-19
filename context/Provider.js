import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

export const MyContext = React.createContext();

const Provider = props => {
  const [user, setUser] = useState({
    token: "",
    saveToken: async userToken => {
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
    }
  });

  useEffect(() => {
    //Put the token from asyncstorage to the state when app loads
    AsyncStorage.getItem("userToken")
      .then(token => {
        console.log("TOKEN_storage=" + token);
        setUser({ ...user, token: token });
      })
      .then(console.log("TOKEN_state  =" + user.token))
      .catch(error => {
        setUser({ ...user, error: error });
      });
  }, []);

  useEffect(() => {
    console.log("NOVO = ", user);
  }, [user]);

  return <MyContext.Provider value={user}>{props.children}</MyContext.Provider>;
};

export default Provider;
