import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import LocationCard from "./LocationCard";
import Geolocation from "@react-native-community/geolocation";
import api from "../../utils/api";

const NearbyLocations = ({ handleTextChange }) => {
  const [nearbyCities, setNearbyCities] = useState([]);

  const handlePress = (locationName) => {
    handleTextChange(locationName);
  };

  useEffect(() => {
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
