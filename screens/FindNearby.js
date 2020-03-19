import React, { useEffect, useContext } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import api from "../utils/api";
import { MyContext } from "../context/Provider";

const FindNearby = () => {
  const user = useContext(MyContext);

  const data = {
    long: 46.3059708,
    lat: 16.3369023
  };

  useEffect(() => {
    api
      .get("/nearby/restaurants", {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        params: data
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <MapView
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
    />
  );
};

export default FindNearby;
