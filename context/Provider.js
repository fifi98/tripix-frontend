import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../utils/api";

export const MyContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({
    user_id: null,
    token: "",
    saveToken: async (userToken, user_id) => {
      try {
        const resp = await AsyncStorage.setItem("userToken", userToken);
        const resp2 = await AsyncStorage.setItem("user_id", user_id.toString());
        setUser({ ...user, user_id: user_id, token: userToken });
        return resp;
      } catch (error) {
        setUser({ error });
      }
    },
    removeToken: async () => {
      try {
        const resp = await AsyncStorage.removeItem("userToken");
        setUser({ ...user, user_id: null, token: null });
        console.log("b");
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
  });

  const [newRoute, setNewRoute] = useState({ location: "", attractions: [], date: "" });

  const value = { user, setUser, newRoute, setNewRoute };

  useEffect(() => {
    //Put the token from asyncstorage to the state when app loads
    AsyncStorage.getItem("userToken")
      .then((token) => {
        AsyncStorage.getItem("user_id")
          .then((user_id) => {
            setUser({ ...user, token: token, user_id: user_id });
            // Add the token to the header of each sent request
            api.defaults.headers.common["Authorization"] = "Bearer " + token;
          })
          .catch((error) => {
            setUser({ ...user, error: error });
          });
      })
      .catch((error) => {
        setUser({ ...user, error: error });
      });
  }, []);

  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>;
};

export default Provider;
