import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

const Progress = ({ locations }) => {
  const visitedLocations = locations.filter((loc) => loc.status == 1).length;

  return (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>
        {visitedLocations} / {locations.length}
      </Text>
      <FontAwesomeIcon icon={faLandmark} size={18} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    right: "5%",
    backgroundColor: "rgba(49, 50, 51, 0.9)",
    borderRadius: 6,
    padding: 10,
    top: "5%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {
    color: "white",
    marginHorizontal: 4,
  },
  text: {
    color: "white",
    marginHorizontal: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Progress;
