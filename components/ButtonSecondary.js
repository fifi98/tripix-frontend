import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../constants/theme";

const ButtonPrimary = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  text: {
    color: colors.textGray
  }
});

export default ButtonPrimary;
