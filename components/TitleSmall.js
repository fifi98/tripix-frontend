import React from "react";
import { Text, StyleSheet, View } from "react-native";

const TitleSmall = ({ textBold, text }) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, fontWeight: "bold" }}>{textBold}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 27,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 27,
    color: "white",
  },
});

export default TitleSmall;
