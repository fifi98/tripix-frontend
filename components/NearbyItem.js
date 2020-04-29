import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const NearbyItem = ({ item }) => {
  return (
    <View>
      <FastImage
        style={styles.image}
        source={{
          uri: `http://31.220.45.114/tripix/public/api/getphoto?photo_reference=${item.photo_reference}&maxwidth=100`,
        }}
      />
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 20,
  },
});

export default NearbyItem;
