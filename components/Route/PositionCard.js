import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../constants/theme";

const PositionCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => onPress(item)}>
      <View
        style={{
          backgroundColor: colors.inputField,
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {item.default ? (
          <View
            style={{
              backgroundColor: "#636366",
              borderRadius: 30,
              margin: 8,
              padding: 12,
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={item.icon} size={34} style={{ color: "white" }} />
          </View>
        ) : (
          <View style={{ borderRadius: 30, margin: 8 }}>
            <Image
              style={styles.image}
              source={{
                uri: "http://31.220.45.114/tripix/public/api/getphoto?photo_reference=" + item.photo_reference,
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
  text: {
    color: "white",
    fontSize: 16,
    marginLeft: 6,
  },
});

export default PositionCard;
