import React from "react";
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native";
import { colors } from "../../constants/theme";

const ButtonPrimary = ({ title, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loading ? <ActivityIndicator size="small" color="#000000" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 41,
    backgroundColor: colors.button,
    borderRadius: 6,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ButtonPrimary;
