import React from "react";
import { Text, StyleSheet } from "react-native";

const Subtitle = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: "white",
    marginBottom: 10,
  },
});

export default Subtitle;
