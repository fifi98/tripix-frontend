import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faLandmark } from "@fortawesome/free-solid-svg-icons";

const RouteCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.details}>
          <Text style={styles.text}> 2h </Text>
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
          <Text style={styles.text}> 3 </Text>
          <FontAwesomeIcon icon={faLandmark} style={styles.icon} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 120,
    marginVertical: 8,
    borderRadius: 10
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  details: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 4,
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    paddingHorizontal: 8,
    opacity: 0.5
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  icon: {
    color: "white"
  }
});

export default RouteCard;
