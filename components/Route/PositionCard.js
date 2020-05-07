import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../constants/theme";
import { BASE_URL } from "react-native-dotenv";

const PositionCard = ({ item, onPress, selected }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <View style={[styles.container, selected ? styles.selected : styles.unselected]}>
        {item.default ? (
          <View style={styles.defaultButton}>
            <FontAwesomeIcon icon={item.icon} size={34} style={styles.icon} />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${BASE_URL}/photo?photo_reference=${item.photo_reference}`,
              }}
            />
          </View>
        )}
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  imageContainer: {
    borderRadius: 30,
    margin: 8,
  },
  icon: {
    color: colors.textPrimary,
  },
  card: {
    marginBottom: 10,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    marginLeft: 6,
  },
  container: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  unselected: {
    backgroundColor: colors.inputField,
  },
  selected: {
    backgroundColor: "#636366",
  },
  defaultButton: {
    backgroundColor: "#636366",
    borderRadius: 30,
    margin: 8,
    padding: 12,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PositionCard;
