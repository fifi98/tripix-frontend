import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../constants/theme";
import CardButton from "../components/CardButton";
import { faPlus, faRoute, faMapMarker, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import RoundButton from "../components/RoundButton";

const Home = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.caption}>Hello, Filip!</Text>
        <Text style={styles.textSecondary}>Routes</Text>
        <View style={styles.cardContainer}>
          <CardButton title="New route" icon={faPlus} color="#FE375F" />
          <CardButton title="Planned routes" icon={faRoute} color="#63D2FD" />
          <CardButton title="Finished routes" icon={faMapMarker} color="#5E5CE6" />
          <CardButton title="Suggested" icon={faLightbulb} color="#FF9F28" />
        </View>
        <Text style={styles.textSecondary}>Find nearby</Text>
        <View style={styles.nearbyContainer}>
          <RoundButton text="Restaurants" />
          <RoundButton text="Coffee Shops" />
          <RoundButton text="Shops" />
          <RoundButton text="Attractions" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: "20%",
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  textSecondary: {
    color: "white",
    fontSize: 16,
    marginTop: 10
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20
  },
  nearbyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    width: "90%",
    alignItems: "center"
  },
  container: {
    width: "85%"
  },
  caption: {
    fontSize: 27,
    color: "white",
    marginBottom: 10
  }
});

export default Home;
