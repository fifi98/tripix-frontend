import React, { useContext } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { faWalking, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../../constants/theme";
import { MyContext } from "../../../context/Provider";

const LandmarkItem = ({ location }) => {
  const { newRoute } = useContext(MyContext);

  // If the route is created and we don't have landmark's name and photo reference
  if (!location.name) var test = newRoute.attractions.find((a) => a.location.lat === location.latitude);
  else var test = location;

  return (
    <View>
      {location.distance != 0 && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 60, alignItems: "center" }}>
            <View style={{ backgroundColor: "#0A84FF", height: 18, width: 3 }} />
            <FontAwesomeIcon icon={faWalking} size={22} style={{ color: "#0A84FF", marginVertical: 5 }} />
            <View style={{ backgroundColor: "#0A84FF", height: 18, width: 3 }} />
          </View>
          <View style={{ marginLeft: 20, flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon icon={faClock} style={styles.icon} />
            <Text style={styles.text}>
              {location.duration} min · {location.distance} km
            </Text>
          </View>
        </View>
      )}

      <View style={styles.container}>
        <View style={{ width: 60 }}>
          <Image
            style={styles.image}
            source={{
              uri: `http://31.220.45.114/tripix/public/api/getphoto?photo_reference=${test.photo_reference}&maxwidth=100`,
            }}
          />
        </View>
        <Text style={styles.title}>{test.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 20,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  icon: {
    color: colors.textSecondary,
    marginRight: 7,
  },
});

export default LandmarkItem;
