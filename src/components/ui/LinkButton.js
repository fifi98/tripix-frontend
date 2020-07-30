import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
const LinkButton = ({ text, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18.5,
    color: "#0077F9",
  },
  container: {
    marginVertical: 4,
  },
});

export default LinkButton;
