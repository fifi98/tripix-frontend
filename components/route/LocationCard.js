import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { BASE_URL } from "react-native-dotenv";

const LocationCard = ({ city, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <ImageBackground
          source={{
            url: `${BASE_URL}/photo?photo_reference=${city.photo_reference}`,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{city.city}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: 0.88 * Dimensions.get("screen").width,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    opacity: 0.5,
  },
  text: {
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
});

export default LocationCard;
