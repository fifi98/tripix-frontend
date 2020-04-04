import React from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleUnchecked } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../context/Provider";

import Rating from "../components/Rating";

const RouteCard = ({ item, onLongPress }) => {
  const { user, setUser } = React.useContext(MyContext);

  const handleSelect = () => {
    console.log(user.selectedLandmarks);
    setUser((old) => ({ ...user, selectedLandmarks: [...old.selectedLandmarks, item] }));
    // setUser((u) => {
    //   selectedLandmarks: ["aa"];
    // });
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress} onPress={handleSelect}>
      <ImageBackground
        source={{
          url: "http://31.220.45.114/tripix/public/api/getphoto?photo_reference=" + item.photo_reference,
        }}
        style={styles.image}
      ></ImageBackground>
      <View style={styles.data}>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.checkBox}>
            {user.selectedLandmarks.find((x) => x.place_id === item.place_id) ? (
              <FontAwesomeIcon icon={faCheckCircle} style={styles.icon} size={24} />
            ) : (
              <FontAwesomeIcon icon={faCheckCircleUnchecked} style={styles.icon} size={24} />
            )}
          </View>
          <View style={styles.rating}>
            <Rating rating={item.rating} />
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.textContainer}>
            <Text adjustsFontSizeToFit allowFontScaling minimumFontScale={0.5} numberOfLines={3} style={styles.textName}>
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
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
});

export default RouteCard;
