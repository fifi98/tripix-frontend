import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const RouteCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.locationText}>{item.key}</Text>
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
  }
});

export default RouteCard;
