import React, { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../../constants/mapStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../../../context/Provider";

const Trip = ({ navigation }) => {
  const { user, newRoute } = React.useContext(MyContext);

  let mapRef = React.createRef();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        onMapReady={() => {
          mapRef.fitToCoordinates(newRoute.trip.locations, {
            edgePadding: { top: 0, right: 50, bottom: 200, left: 50 },
            animated: true,
          });
        }}
        ref={(ref) => (mapRef = ref)}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        {/* Draw the route */}
        <Polyline coordinates={newRoute.trip.locations} strokeWidth={5} strokeColor="#3890FB" />

        {newRoute.trip.locations.map((k) => console.log({ latitude: k.latitude, longitude: k.longitude }))}

        {/* Mark all the locations */}
        {newRoute.trip.locations.map((loc) => (
          <Marker key={loc.latitude} coordinate={{ latitude: loc.latitude, longitude: loc.longitude }} />
        ))}
      </MapView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesomeIcon icon={faChevronCircleLeft} style={styles.icon} size={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    left: 22,
    top: 34,
  },
  icon: {
    color: "white",
  },
});

export default Trip;
