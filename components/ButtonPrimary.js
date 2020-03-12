import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../constants/theme";

const ButtonPrimary = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 41,
    backgroundColor: colors.button,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ButtonPrimary;
