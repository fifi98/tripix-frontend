import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
import api from "../utils/api";
import { MyContext } from "../context/Provider";

const LocationCard = ({ city }) => {
  const user = React.useContext(MyContext);

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <ImageBackground
          source={{
            url: "http://31.220.45.114/tripix/public/api/getphoto?photo_reference=" + city.item.photo_reference
          }}
          style={{ width: "100%", height: "100%", opacity: 0.5 }}
        ></ImageBackground>
        <Text style={styles.text}>{city.item.city}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: 0.85 * Dimensions.get("screen").width,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 20,
    overflow: "hidden"
  },
  text: {
    color: "white",
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 10
  }
});

export default LocationCard;
