import React, { useEffect, useState } from "react";
import { ScrollView, Alert, PermissionsAndroid, Platform } from "react-native";
import LocationCard from "./LocationCard";
import Geolocation from "@react-native-community/geolocation";
import api from "../../utils/api";

const NearbyLocations = ({ handleTextChange }) => {
  const [nearbyCities, setNearbyCities] = useState([]);

  const handlePress = (locationName) => {
    handleTextChange(locationName);
  };

  useEffect(() => {
    const getLocationsAndroid = async () => {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            api
              .get("/nearby/cities", {
                params: {
                  lat: position.coords.latitude,
                  long: position.coords.longitude,
                },
              })
              .then((results) => setNearbyCities(results.data))
              .catch(() => Alert.alert("An error has occured, please try again later!"));
          },
          (error) => Alert.alert(error.message)
        );
      } else {
        Alert.alert("You have to allow Tripix to use your location!");
      }
    };

    if (Platform.OS === "android") {
      getLocationsAndroid();
    } else {
      // If it's IOS
      Geolocation.getCurrentPosition(
        (position) => {
          api
            .get("/nearby/cities", {
              params: {
                lat: position.coords.latitude,
                long: position.coords.longitude,
              },
            })
            .then((results) => setNearbyCities(results.data))
            .catch(() => Alert.alert("An error has occured, please try again later!"));
        },
        (error) => Alert.alert(error.message)
      );
    }
  }, []);

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {nearbyCities.map((city) => (
        <LocationCard key={city.photo_reference} city={city} handlePress={() => handlePress(city.city)} />
      ))}
    </ScrollView>
  );
};

export default NearbyLocations;
