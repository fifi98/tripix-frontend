import React, { useEffect, useState, createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../utils/api";

export const MyContext = createContext();

const Provider = (props) => {
  const [user, setUser] = useState({
    user_id: null,
    name: "",
    token: "",
    saveToken: async (userToken, userID, userFullName, email) => {
      const token = ["token", userToken];
      const user_id = ["user_id", userID.toString()];
      const name = ["name", userFullName.split(" ")[0]];
      const user_email = ["email", email];

      try {
        await AsyncStorage.multiSet([token, user_id, name, user_email]);
        setUser({ ...user, user_id: userID, token: userToken, name: userFullName.split(" ")[0], email: email });
      } catch (error) {
        setUser({ error });
      }
    },
    removeToken: async () => {
      try {
        await AsyncStorage.multiRemove(["token", "user_id", "name", "email"]);
        setUser({ ...user, user_id: null, token: null });
      } catch (error) {
        setUser({ error });
      }
    },
    changePassword: async (newToken) => {
      try {
        await AsyncStorage.setItem("token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        setUser({ ...user, token: newToken });
      } catch (error) {
        setUser({ error });
      }
    },
  });

  const [newRoute, setNewRoute] = useState({ location: "", attractions: [], date: "" });

  // Put the token from AsyncStorage to the state when app loads
  useEffect(() => {
    AsyncStorage.multiGet(["token", "user_id", "name", "email"]).then((storage) => {
      storage.map((item) => setUser((old) => ({ ...old, [item[0]]: item[1] })));
    });
  }, []);

  // When token is fetched, add it to the Authorization header for each request
  useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }, [user.token]);

  return <MyContext.Provider value={{ user, setUser, newRoute, setNewRoute }}>{props.children}</MyContext.Provider>;
};

export default Provider;
