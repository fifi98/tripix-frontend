import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../constants/theme";
import CardButton from "../components/CardButton";
import { faPlus, faRoute, faMapMarker, faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Routes</Text>
        <View style={styles.cardContainer}>
          <CardButton title="New route" icon={faPlus} />
          <CardButton title="Planned routes" icon={faRoute} />
          <CardButton title="Finished routes" icon={faMapMarker} />
          <CardButton title="Suggested" icon={faLightbulb} />
        </View>
        <Text style={{ color: "white" }}>Find nearby</Text>
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
    color: colors.textSecondary
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  container: {
    width: "85%"
  }
});

export default Home;
