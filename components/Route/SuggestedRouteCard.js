import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { faCheckCircle as faCheckCircleUnchecked } from "@fortawesome/free-regular-svg-icons";
import { faClock, faLandmark, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { formatDuration } from "../../utils/formatDuration";
import { BASE_URL } from "react-native-dotenv";
import { colors } from "../../constants/theme";

const SuggestedRouteCard = ({ item, handleSelect, selected }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => handleSelect(item.name)}>
        <ImageBackground
          source={{
            uri: `${BASE_URL}/photo?photo_reference=${item.photo_ref}`,
          }}
          style={styles.image}
        />
        <View style={styles.data}>
          <View style={styles.checkBox}>
            <FontAwesomeIcon icon={selected ? faCheckCircle : faCheckCircleUnchecked} style={styles.icon} size={24} />
          </View>
          <View style={styles.details}>
            <Text style={styles.text}>{formatDuration(item.duration)}</Text>
            <FontAwesomeIcon icon={faClock} style={styles.icon} />
            <Text style={styles.text}>{item.number_attractions}</Text>
            <FontAwesomeIcon icon={faLandmark} style={styles.icon} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
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
  details: {
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 10,
    padding: 4,
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  text: {
    color: "white",
    fontWeight: "600",
    marginHorizontal: 5,
  },
  icon: {
    color: "white",
  },
  textView: {
    alignItems: "center",
    justifyContent: "center",
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
  dateText: {
    color: colors.textSecondary,
    fontSize: 17,
    marginVertical: 2,
  },
  checkBox: {
    padding: 4,
    position: "absolute",
    left: 10,
    top: 10,
    flexDirection: "row",
  },
});

export default SuggestedRouteCard;
