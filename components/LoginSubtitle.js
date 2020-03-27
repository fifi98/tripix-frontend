import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

const LoginSubtitle = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.textSecondary,
    fontSize: 17,
    marginVertical: 20
  }
});

export default LoginSubtitle;
