import React, { useEffect, useContext, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import api from "../../utils/api";
import { MyContext } from "../../context/Provider";
import RoundButton from "../../components/RoundButton";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../constants/mapStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { View, Alert, TouchableHighlight, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FindNearby = ({ route, navigation }) => {
  const user = useContext(MyContext);
  const [userPosition, setUserPosition] = useState();
  const [places, setPlaces] = useState([]);

  const placeType = route.params.type;

  const fetchData = (position) => {
    let initialPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    };

    setUserPosition(initialPosition);
    api
      .get("/nearby/" + placeType, {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: { long: position.coords.longitude, lat: position.coords.latitude },
      })
      .then((response) => {
        response.data.results.map((place) => {
          setPlaces((places) => [
            ...places,
            { latitude: place.geometry.location.lat, longitude: place.geometry.location.lng, name: place.name },
          ]);
        });
      })
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => fetchData(position), (error) => Alert.alert(error.message));
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
        {places.map((place) => (
          <Marker key={Math.random()} coordinate={{ latitude: place.latitude, longitude: place.longitude }}>
            {/* <RoundButton text="Restaurants" color="#0884FA" icon={faUtensils} /> */}
          </Marker>
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

export default FindNearby;
