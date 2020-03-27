import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faRoute, faMapMarker, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const RoundButton = ({ text, color, icon, onPress }) => {
  return (
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <View style={{ ...styles.iconContainer, backgroundColor: color }}>
        <FontAwesomeIcon icon={icon} style={styles.icon} size={30} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 8
  },
  icon: {
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 12
  }
});

export default RoundButton;
