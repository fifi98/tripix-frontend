import React from "react";
import { TouchableOpacity, StyleSheet, Text, Keyboard } from "react-native";

const AutoCompleteItem = ({ location, handleTextChange }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleTextChange(location);
      }}
      style={styles.container}
    >
      <Text style={styles.text}>{location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    justifyContent: "center",
    marginLeft: 7,
    paddingBottom: 7,
    borderBottomColor: "#4A4A4B",
    borderBottomWidth: 1,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default AutoCompleteItem;
