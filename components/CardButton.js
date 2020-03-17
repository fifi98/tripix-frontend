import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const CardButton = ({ title, icon, color }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={{ ...styles.iconContainer, backgroundColor: color }}>
        <FontAwesomeIcon icon={icon} style={styles.icon} size={20} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardButton,
    borderRadius: 10,
    width: "47%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 8
  },
  icon: {
    color: "white"
  },
  text: {
    color: colors.textPrimary
  }
});

export default CardButton;
