import React, { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleUnchecked } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../../context/Provider";
import { BASE_URL } from "react-native-dotenv";
import Rating from "./Rating";

const RouteCard = ({ item, onLongPress }) => {
  const { newRoute, setNewRoute } = useContext(MyContext);

  const handleSelect = () => {
    if (newRoute.attractions.find((x) => x.place_id === item.place_id)) {
      setNewRoute((old) => ({ ...old, attractions: [...old.attractions.filter((x) => x.place_id !== item.place_id)] }));
    } else {
      setNewRoute((old) => ({ ...old, attractions: [...old.attractions, item] }));
    }
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={() => onLongPress(item)} onPress={handleSelect}>
      <ImageBackground
        source={{
          url: `${BASE_URL}/getphoto?photo_reference=${item.photo_reference}&maxwidth=300`,
        }}
        style={styles.image}
      />
      <View style={styles.data}>
        <View style={styles.checkBox}>
          <FontAwesomeIcon
            icon={newRoute.attractions.find((x) => x.place_id === item.place_id) ? faCheckCircle : faCheckCircleUnchecked}
            style={styles.icon}
            size={27}
          />
        </View>
        <View style={styles.rating}>
          <Rating rating={item.rating} color="#FFF" />
        </View>
        <View style={styles.textView}>
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
  star: {
    margin: 1,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
    textAlign: "center",
  },
  textView: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
});

export default RouteCard;
