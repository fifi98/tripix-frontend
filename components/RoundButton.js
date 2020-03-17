import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faRoute, faMapMarker, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const RoundButton = ({ text }) => {
  return (
    <TouchableOpacity style={{ alignItems: "center" }}>
      <View style={{ ...styles.iconContainer, backgroundColor: "#FE375F" }}>
        <FontAwesomeIcon icon={faPlus} style={styles.icon} size={25} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 8
  },
  icon: {
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 10
  }
});

export default RoundButton;
