import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView, Image } from "react-native";
import InputField from "../../../components/InputField";
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
  const { user, setNewRoute, newRoute } = React.useContext(MyContext);
  let coords = null;

  const a = {
    origin: { lat: 46.3526877, long: 16.8123505 },
    destination: { lat: 46.3091764, long: 16.3420242 },
    waypoints: [{ lat: 46.3380636, long: 16.6129778 }, { lat: 46.3258985, long: 16.7827804 }],
  };

  useEffect(() => {
    api
      .post("/route/new_route", a, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((results) => {
        setNewRoute((old) => ({
          ...old,
          trip: {
            ...results.data,
            location: old.location,
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
    console.log(newRoute.trip);
    props.navigation.navigate("Trip");
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
                <LandmarkItem location={location} key={location.place_id} />
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
    width: "85%",
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
