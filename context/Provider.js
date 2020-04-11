import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

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
    selectedLandmarks: [],
    addRemoveLandmark: landmark => {
      user.selectedLandmarks.map(x => console.log(x.place_id));

      if (user.selectedLandmarks.find(x => x.place_id === landmark.place_id)) {
        //Remove
        console.log("rmove");
        setUser(old => ({ ...user, selectedLandmarks: [...old.selectedLandmarks.filter(x => x.place_id != landmark.place_id)] }));
      } else {
        console.log("add");
        //Add
        setUser(old => ({ ...user, selectedLandmarks: [...old.selectedLandmarks, landmark] }));
      }
    }
  });

  const [newRoute, setNewRoute] = useState({ location: "", attractions: [], date: "" });

  const value = { user, setUser, newRoute, setNewRoute };

  useEffect(() => {
    //Put the token from asyncstorage to the state when app loads
    AsyncStorage.getItem("userToken")
      .then(token => {
        setUser({ ...user, token: token });
      })
      .catch(error => {
        setUser({ ...user, error: error });
      });
  }, []);

  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>;
};

export default Provider;
