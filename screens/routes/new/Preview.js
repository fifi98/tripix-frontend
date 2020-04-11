import React, { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../../constants/mapStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import MapViewDirections from "react-native-maps-directions";

const Preview = ({ route, navigation }) => {
  const [userPosition, setUserPosition] = useState();

  const fetchData = position => {
    let initialPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    };

    setUserPosition(initialPosition);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(position => fetchData(position), error => Alert.alert(error.message));
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={userPosition}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        <MapViewDirections
          origin={{ latitude: 46.3526877, longitude: 16.8123505 }}
          destination={{ latitude: 46.3091764, longitude: 16.3420242 }}
          waypoints={[{ latitude: 46.3380636, longitude: 16.6129778 }, { latitude: 46.3258985, longitude: 16.7827804 }]}
          apikey={"AIzaSyCFOkhSfIYP_i1w5q_Lk-3Rg81dAsCSwcE"}
          strokeWidth={5}
          strokeColor="red"
          optimizeWaypoints={true}
          onReady={result => {
            console.log(result.duration);
          }}
        />
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
    top: 34
  },
  icon: {
    color: "white"
  }
});

export default Preview;
