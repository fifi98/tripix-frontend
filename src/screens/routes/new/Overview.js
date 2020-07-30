import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import LandmarkItem from "../../../components/route/LandmarkItem";
import BottomMenu from "../../../components/route/BottomMenu";
import BoldText from "../../../components/ui/BoldText";
import Loading from "../../../components/ui/Loading";
import api from "../../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../../constants/theme";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import { formatDuration } from "../../../utils/formatDuration";

const Overview = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setNewRoute, newRoute } = useContext(MyContext);

  useEffect(() => {
    // Get origin place from the Context
    let origin = newRoute.origin;

    // Get destination place from the Context
    let destination = newRoute.destination;

    // Waypoint places are all except the origin and destination place
    let waypoints = newRoute.attractions.filter((loc) => loc.location.lat != origin.lat && loc.location.lat != destination.lat);

    // Extract only waypoint coordinates
    var waypoints_locations = waypoints.map((wp) => ({ lat: wp.location.lat, long: wp.location.lng }));

    // Send request to the server to create the optimal route
    api
      .post("/route/new", { origin: origin, destination: destination, waypoints: waypoints_locations })
      .then((results) => {
        // Save the created route in the Context
        setNewRoute((old) => ({
          ...old,
          trip: {
            ...results.data,
            location: old.location,
            user_id: user.user_id,
            route: results.data.route,
          },
        }));

        setIsLoading(false);
      })
      .catch(() => Alert.alert("An error occured while creating your route!"));
  }, []);

  const handleNext = () => {
    // Get all the locations in the correct order as received from the server
    const locations = newRoute.trip.locations;

    // Match received locations that are in order with the rest of information about those landmarks that
    // we had saved in the state when user was picking landmarks he wants to see
    locations.map((location) => {
      const loc = newRoute.attractions.find(
        (attraction) => location.latitude === attraction.location.lat && location.longitude === attraction.location.lng
      );
      location.place_id = loc.place_id;
      location.name = loc.name;
      location.photo_reference = loc.photo_reference;
    });

    // Update Context with the new route information
    setNewRoute((old) => ({
      ...old,
      trip: {
        ...old.trip,
        locations: locations,
        polyline: newRoute.trip.route,
      },
    }));

    // Save the route to our account
    api
      .post("/route/plan", newRoute.trip)
      .then(() => {
        navigation.navigate("Trip", { trip: newRoute.trip });
      })
      .catch(() => Alert.alert("An error occured while creating your route!"));
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) return <Loading text="Creating your route" />;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Overview</BoldText> of your trip to <BoldText>{newRoute.trip.location}</BoldText>
        </Text>
        <View style={styles.dataContainer}>
          <FontAwesomeIcon icon={faClock} style={{ color: colors.textSecondary }} />
          <Text style={{ color: colors.textSecondary, marginLeft: 10 }}>
            {formatDuration(newRoute.trip.duration)} · {newRoute.trip.distance} km
          </Text>
        </View>
        <ScrollView>
          {newRoute.trip.locations.map((location) => (
            <LandmarkItem location={location} key={location.latitude} />
          ))}
        </ScrollView>
      </View>
      <BottomMenu back={handleBack} backTitle="Back" next={handleNext} nextTitle="Create" />
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
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10,
  },
});
export default Overview;
