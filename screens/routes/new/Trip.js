import React, { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../../constants/mapStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../../../context/Provider";

const Trip = ({ route, navigation }) => {
  const [userPosition, setUserPosition] = useState();
  const [initialPosition, setInitialPosition] = useState({
    latitude: 40,
    longitude: 40,
    latitudeDelta: 0.0822,
    longitudeDelta: 0.0321,
  });
  const { user, newRoute } = React.useContext(MyContext);

  useEffect(() => {
    setInitialPosition((old) => ({
      ...old,
      latitude: newRoute.trip.locations[0].latitude,
      longitude: newRoute.trip.locations[0].longitude,
    }));
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={initialPosition}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        <Polyline coordinates={newRoute.trip.locations} strokeWidth={5} strokeColor="#3890FB" />
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
