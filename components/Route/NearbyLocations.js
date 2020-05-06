import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import LocationCard from "../LocationCard";
import Geolocation from "@react-native-community/geolocation";
import api from "../../utils/api";

const NearbyLocations = ({ handleNext }) => {
  const [nearbyCities, setNearbyCities] = useState([]);
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
          .catch((err) => console.log(err));
      },
      (error) => Alert.alert(error.message)
    );
  }, []);

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {nearbyCities.map((city) => (
        <LocationCard key={city.photo_reference} city={city} handleNext={handleNext} />
      ))}
    </ScrollView>
  );
};

export default NearbyLocations;
