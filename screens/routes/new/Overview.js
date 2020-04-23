import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView, Alert } from "react-native";
import { colors } from "../../../constants/theme";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import api from "../../../utils/api";
import Polyline from "@mapbox/polyline";
import LandmarkItem from "../../../components/Route/Overview/LandmarkItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native-gesture-handler";

const Overview = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setNewRoute, newRoute } = useContext(MyContext);
  let coords = null;

  useEffect(() => {
    let origin = newRoute.origin;
    let destination = newRoute.destination;

    let waypoints = newRoute.attractions.filter((loc) => loc.location.lat != origin.lat && loc.location.lat != destination.lat);

    // Izvadi samo koordinate waypointsa
    var waypoints_locations = waypoints.map((wp) => ({ lat: wp.location.lat, long: wp.location.lng }));

    api
      .post("/route/new_route", { origin: origin, destination: destination, waypoints: waypoints_locations })
      .then((results) => {
        setNewRoute((old) => ({
          ...old,
          trip: {
            ...results.data,
            location: old.location,
            user_id: user.user_id,
          },
        }));

        const points = Polyline.decode(results.data.route);

        coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNext = () => {
    const a = newRoute.trip.locations;
    a.map((location) => {
      const loc = newRoute.attractions.find(
        (attraction) => location.latitude === attraction.location.lat && location.longitude === attraction.location.lng
      );
      location.place_id = loc.place_id;
      location.name = loc.name;
      location.photo_reference = loc.photo_reference;
    });
    setNewRoute((old) => ({ ...old, trip: { ...old.trip, locations: a } }));

    api
      .post("/route/plan_route", newRoute.trip)
      .then((response) => props.navigation.navigate("Trip"))
      .catch((err) => {
        Alert.alert("An error occured!");
      });
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {!isLoading ? (
          <>
            <Text style={styles.title}>Overview of your trip to {newRoute.trip.location}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, marginBottom: 15 }}>
              <FontAwesomeIcon icon={faClock} style={{ color: colors.textSecondary }} />
              <Text style={{ color: colors.textSecondary, marginLeft: 10 }}>
                {newRoute.trip.duration} mins · {newRoute.trip.distance} km
              </Text>
            </View>
            <ScrollView>
              {newRoute.trip.locations.map((location) => (
                <LandmarkItem location={location} key={location.latitude} />
              ))}
            </ScrollView>
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
      <View style={{ width: "100%" }}>
        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={handleBack} />
          <Button title="Create" onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "88%",
    paddingTop: 30,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderTopColor: "#3D3D3D",
    backgroundColor: "#161616",
    borderTopWidth: 0.3,
  },
});
export default Overview;
