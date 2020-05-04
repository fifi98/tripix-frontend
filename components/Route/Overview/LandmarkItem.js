import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { faWalking, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../../constants/theme";
import { MyContext } from "../../../context/Provider";
import { formatDuration } from "../../../utils/formatDuration";
import { BASE_URL } from "react-native-dotenv";
import FastImage from "react-native-fast-image";

const LandmarkItem = ({ location }) => {
  const { newRoute } = useContext(MyContext);

  // If the route is created and we don't have landmark's name and photo reference
  var test = newRoute.attractions.find((a) => a.location.lat === location.latitude);
  if (!test) test = location;

  return (
    <View>
      {/* Transport type, duration and travel time - if not the first landmark */}
      {location.distance != 0 && (
        <View style={styles.detailsContainer}>
          <View style={styles.transportContainer}>
            <View style={styles.line} />
            <FontAwesomeIcon icon={faWalking} size={22} style={styles.iconTransport} />
            <View style={styles.line} />
          </View>
          <View style={styles.durationDistanceContainer}>
            <FontAwesomeIcon icon={faClock} style={styles.icon} />
            <Text style={styles.text}>
              {formatDuration(location.duration)} · {location.distance} km
            </Text>
          </View>
        </View>
      )}

      {/* Landmark icon and name */}
      <View style={styles.container}>
        <View style={{ width: 60 }}>
          <FastImage
            style={styles.image}
            source={{
              uri: `${BASE_URL}/getphoto?photo_reference=${test.photo_reference}&maxwidth=100`,
            }}
          />
        </View>
        <Text style={styles.title}>{test.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 20,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  icon: {
    color: colors.textSecondary,
    marginRight: 7,
  },
  line: {
    backgroundColor: "#0A84FF",
    height: 18,
    width: 3,
  },
  iconTransport: {
    color: "#0A84FF",
    marginVertical: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  transportContainer: {
    width: 60,
    alignItems: "center",
  },
  durationDistanceContainer: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LandmarkItem;
