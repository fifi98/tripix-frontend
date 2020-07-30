import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { faCar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../constants/theme";
import { MyContext } from "../../context/Provider";
import { formatDuration } from "../../utils/formatDuration";
import { BASE_URL } from "react-native-dotenv";
import FastImage from "react-native-fast-image";

const LandmarkItem = ({ location, started }) => {
  const { newRoute } = useContext(MyContext);

  // If the route is created and we don't have landmark's name and photo reference
  var landmark = newRoute.attractions.find((a) => a.location.lat === location.latitude);
  if (!landmark) landmark = location;

  return (
    <View>
      {/* Transport type, duration and travel time - if not the first landmark */}
      {location.distance != 0 && (
        <View style={styles.detailsContainer}>
          <View style={styles.transportContainer}>
            <View style={location.status == "1" && started ? styles.lineVisited : styles.line} />
            <FontAwesomeIcon
              icon={faCar}
              size={22}
              style={location.status == 1 && started ? styles.iconTransportVisited : styles.iconTransport}
            />
            <View style={location.status == 1 && started ? styles.lineVisited : styles.line} />
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
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{
              uri: `${BASE_URL}/photo?photo_reference=${landmark.photo_reference}&maxwidth=100`,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{landmark.name}</Text>
        </View>
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
  imageContainer: {
    width: 60,
  },
  titleContainer: {
    width: "80%",
  },
  title: {
    color: colors.textPrimary,
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
    backgroundColor: colors.accent,
    height: 18,
    width: 3,
  },
  lineVisited: {
    backgroundColor: "#30D158",
    height: 18,
    width: 3,
  },
  iconTransport: {
    color: colors.accent,
    marginVertical: 5,
  },
  iconTransportVisited: {
    color: "#30D158",
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
