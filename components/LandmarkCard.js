import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegulat } from "@fortawesome/free-regular-svg-icons";
import Rating from "../components/Rating";

const RouteCard = ({ item, onLongPress }) => {
  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
      <ImageBackground
        source={{
          url: "http://31.220.45.114/tripix/public/api/getphoto?photo_reference=" + item.photo_reference,
        }}
        style={{ width: "100%", height: "100%", opacity: 0.5 }}
      ></ImageBackground>
      <View style={styles.data}>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.checkBox}>
            <FontAwesomeIcon icon={faCheckCircle} style={styles.icon} size={24} />
          </View>
          <View style={styles.rating}>
            <Rating rating={item.rating} />

            {/* <FontAwesomeIcon icon={faStarRegulat} style={styles.icon} />
            <FontAwesomeIcon icon={faStarHalfAlt} transform={{ flipX: 1 }} style={styles.icon} />
            <FontAwesomeIcon icon={faStar} style={styles.icon} />
            <FontAwesomeIcon icon={faStar} style={styles.icon} />
            <FontAwesomeIcon icon={faStar} style={styles.icon} /> */}
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.textContainer}>
            <Text
              adjustsFontSizeToFit
              allowFontScaling
              minimumFontScale={0.5}
              numberOfLines={3}
              style={styles.textName}
            >
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  data: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  rating: {
    padding: 4,
    position: "absolute",
    right: 10,
    top: 90,
    flexDirection: "row",
  },
  checkBox: {
    padding: 4,
    position: "absolute",
    left: 10,
    top: 10,
    flexDirection: "row",
  },
  icon: {
    color: "white",
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
    textAlign: "center",
  },
});

export default RouteCard;
