import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

const LoginSubtitle = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.textSecondary,
    fontSize: 17,
    marginTop: 12,
    marginBottom: 18,
  },
});

export default LoginSubtitle;
