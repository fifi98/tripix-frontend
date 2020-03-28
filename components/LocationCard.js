import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";

const LocationCard = () => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.text}>Coppenhagen</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: 0.85 * Dimensions.get("screen").width,
    backgroundColor: "red",
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 20
  },
  text: {
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 22,
    fontWeight: "bold"
  }
});

export default LocationCard;
