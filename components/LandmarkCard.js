import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";

const RouteCard = ({ item, onLongPress }) => {
  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.checkBox}>
          <FontAwesomeIcon icon={faCheckCircle} style={styles.icon} size={24} />
        </View>
        <View style={styles.rating}>
          <FontAwesomeIcon icon={faStar} style={styles.icon} />
          <FontAwesomeIcon icon={faStar} style={styles.icon} />
          <FontAwesomeIcon icon={faStar} style={styles.icon} />
          <FontAwesomeIcon icon={faStar} style={styles.icon} />
          <FontAwesomeIcon icon={faStar} style={styles.icon} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: 120,
    marginVertical: 8,
    borderRadius: 10
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  rating: {
    padding: 4,
    position: "absolute",
    right: 10,
    top: 90,
    flexDirection: "row"
  },
  checkBox: {
    padding: 4,
    position: "absolute",
    left: 10,
    top: 10,
    flexDirection: "row"
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  icon: {
    color: "white"
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});

export default RouteCard;
