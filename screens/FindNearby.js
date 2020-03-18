import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const FindNearby = () => {
  return (
    <MapView
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      style={{ flex: 1 }}
    />
  );
};

export default FindNearby;
