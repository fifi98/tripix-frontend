import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 34,
    color: "white",
  },
});

export default Title;
