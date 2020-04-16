import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleUnchecked } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../context/Provider";
import StarRating from "react-native-star-rating";

const RouteCard = ({ item, onLongPress }) => {
  const { newRoute, setNewRoute, user } = React.useContext(MyContext);

  const handleSelect = () => {
    if (newRoute.attractions.find((x) => x.place_id === item.place_id)) {
      setNewRoute((old) => ({ ...old, attractions: [...old.attractions.filter((x) => x.place_id !== item.place_id)] }));
    } else {
      setNewRoute((old) => ({ ...old, attractions: [...old.attractions, item] }));
    }
  };

  useEffect(() => console.log(JSON.stringify(newRoute)), [newRoute]);

  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress} onPress={handleSelect}>
      <ImageBackground
        source={{
          url: "http://31.220.45.114/tripix/public/api/getphoto?photo_reference=" + item.photo_reference,
        }}
        style={styles.image}
      />
      <View style={styles.data}>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.checkBox}>
            {newRoute.attractions.find((x) => x.place_id === item.place_id) ? (
              <FontAwesomeIcon icon={faCheckCircle} style={styles.icon} size={24} />
            ) : (
              <FontAwesomeIcon icon={faCheckCircleUnchecked} style={styles.icon} size={24} />
            )}
          </View>
          <View style={styles.rating}>
            {/* <Rating rating={item.rating} /> */}
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.rating}
              fullStarColor={"white"}
              emptyStarColor={"white"}
              halfStarColor={"white"}
              emptyStar={"star-o"}
              fullStar={"star"}
              halfStar={"star-half-full"}
              iconSet={"FontAwesome"}
              reversed
              starSize={16}
              starStyle={{ margin: 1 }}
            />
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
