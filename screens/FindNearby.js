import React, { useEffect, useContext, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import api from "../utils/api";
import { MyContext } from "../context/Provider";
import RoundButton from "../components/RoundButton";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../constants/mapStyle";

import { Text, Alert } from "react-native";

const FindNearby = ({ route }) => {
  const user = useContext(MyContext);
  const [userPosition, setUserPosition] = useState();
  const [places, setPlaces] = useState([]);

  const placeType = route.params.type;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        };
        setUserPosition(initialPosition);

        api
          .get("/nearby/" + placeType, {
            headers: {
              Authorization: "Bearer " + user.token,
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            params: { long: position.coords.longitude, lat: position.coords.latitude }
          })
          .then(response => {
            response.data.results.map(place => {
              setPlaces(staro => [
                ...staro,
                { latitude: place.geometry.location.lat, longitude: place.geometry.location.lng, name: place.name }
              ]);
            });
          })
          .catch(error => console.log(error));
      },
      error => Alert.alert(error.message)
    );
  }, []);

  return (
    <MapView
      initialRegion={userPosition}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      customMapStyle={mapStyle}
    >
      {places.map(place => (
        <Marker key={Math.random()} coordinate={{ latitude: place.latitude, longitude: place.longitude }}>
          {/* <RoundButton text="Restaurants" color="#0884FA" icon={faUtensils} /> */}
        </Marker>
      ))}
    </MapView>
  );
};

export default FindNearby;
