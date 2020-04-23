import React, { useContext } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import StarRating from "react-native-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleUnchecked } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../../../context/Provider";
import { TouchableOpacity } from "react-native-gesture-handler";

const LandMarkDetails = ({ route }) => {
  const { newRoute } = useContext(MyContext);
  const { landmark } = route.params;

  const details = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac dictum enim. Nullam at tempor tellus, eu tincidunttortor. Duis lobortis id elit et commodo. Praesent tincidunt nec lorem vel dignissim. Nullam ultricies odio id nisi malesuada.",
  };

  return (
    <ImageBackground
      source={{
        url: "http://31.220.45.114/tripix/public/api/getphoto?photo_reference=" + landmark.photo_reference,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)", "#000"]} style={{ flex: 1 }} locations={[0.2, 0.45, 0.89]}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={styles.title}>{landmark.name}</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={landmark.rating}
                fullStarColor={"#F0BC2D"}
                emptyStarColor={"#F0BC2D"}
                halfStarColor={"#F0BC2D"}
                emptyStar={"star-o"}
                fullStar={"star"}
                halfStar={"star-half-full"}
                iconSet={"FontAwesome"}
                reversed
                starSize={16}
                starStyle={{ margin: 1 }}
              />
            </View>
            <Text style={styles.description}>{details.description}</Text>
          </View>
        </View>
        <View style={styles.checkBox}>
          {newRoute.attractions.find((x) => x.place_id === landmark.place_id) ? (
            <TouchableOpacity>
              <FontAwesomeIcon icon={faCheckCircle} style={styles.icon} size={27} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => console.log("a")}>
              <View>
                <FontAwesomeIcon icon={faCheckCircleUnchecked} style={styles.icon} size={27} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    width: "70%",
  },
  description: {
    color: "white",
    fontSize: 17,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "85%",
    marginBottom: 40,
  },
  checkBox: {
    padding: 4,
    position: "absolute",
    left: 12,
    top: 12,
    flexDirection: "row",
  },
  icon: {
    color: "white",
  },
});

export default LandMarkDetails;
