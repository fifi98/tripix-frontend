import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ onPress }) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon icon={faChevronCircleLeft} style={styles.icon} size={34} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    left: "5%",
    top: "5%",
  },
  icon: {
    color: "white",
  },
});

export default BackButton;
