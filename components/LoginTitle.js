import React from "react";
import { Text, StyleSheet } from "react-native";

const LoginTitle = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold"
  }
});

export default LoginTitle;
