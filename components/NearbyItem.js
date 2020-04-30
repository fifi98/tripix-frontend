import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "react-native-dotenv";

const NearbyItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: `${BASE_URL}/getphoto?photo_reference=${item.photo_reference}&maxwidth=100`,
        }}
      />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 20,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});

export default NearbyItem;
