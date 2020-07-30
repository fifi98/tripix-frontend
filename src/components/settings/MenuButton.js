import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MenuButton = ({ button }) => {
  return (
    <TouchableOpacity key={button.name} onPress={button.onPress}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <FontAwesomeIcon icon={button.icon} style={styles.icon} />
          <Text style={styles.text}>{button.title}</Text>
        </View>
        <FontAwesomeIcon icon={faChevronRight} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
});

export default MenuButton;
