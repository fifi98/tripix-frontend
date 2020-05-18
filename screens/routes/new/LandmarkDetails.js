import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import api from "../../../utils/api";
import { faCheckCircle as faCheckCircleUnchecked } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import { BASE_URL } from "react-native-dotenv";
import Rating from "../../../components/route/Rating";

const LandMarkDetails = ({ route }) => {
  const { newRoute, setNewRoute } = useContext(MyContext);
  const { landmark } = route.params;
  const [details, setDetails] = useState({ description: "" });

  useEffect(() => {
    api.get(`/place/${landmark.place_id}`).then((response) => {
      setDetails({ description: `"${response.data.description}"` });
    });
  }, []);

  const handleCheck = () => {
    if (newRoute.attractions.find((a) => a.place_id === landmark.place_id)) {
      setNewRoute((old) => ({ ...old, attractions: [...old.attractions.filter((x) => x.place_id !== landmark.place_id)] }));
    } else {
      setNewRoute((old) => ({ ...old, attractions: [...old.attractions, landmark] }));
    }
  };

  return (
    <ImageBackground
      source={{
        uri: `${BASE_URL}/photo?photo_reference=${landmark.photo_reference}`,
      }}
      style={styles.image}
    >
      <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)", "#000"]} style={styles.image} locations={[0.2, 0.45, 0.89]}>
        <View style={styles.screen}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{landmark.name}</Text>
              <Rating rating={landmark.rating} color="#F0BC2D" />
            </View>
            <Text style={styles.description}>{details.description}</Text>
          </View>
        </View>
        <View style={styles.checkBox}>
          <TouchableOpacity onPress={handleCheck}>
            <View>
              <FontAwesomeIcon
                icon={newRoute.attractions.find((x) => x.place_id === landmark.place_id) ? faCheckCircle : faCheckCircleUnchecked}
                style={styles.icon}
                size={27}
              />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
