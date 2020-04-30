import React, { useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { colors } from "../../constants/theme";
import CardButton from "../../components/CardButton";
import {
  faPlus,
  faRoute,
  faMapMarkerAlt,
  faLightbulb,
  faUtensils,
  faCoffee,
  faShoppingCart,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import RoundButton from "../../components/RoundButton";
import { MyContext } from "../../context/Provider";

const Home = ({ navigation }) => {
  const { user } = useContext(MyContext);

  const handleFindNearby = (type, icon, color) => {
    navigation.navigate("FindNearby", { type: type, icon: icon, color: color });
  };

  const cardButtons = [
    { title: "New route", icon: faPlus, color: "#FE375F", onPress: () => navigation.navigate("NewRoute") },
    { title: "Planned routes", icon: faRoute, color: "#63D2FD", onPress: () => navigation.navigate("PlannedRoutes") },
    { title: "Finished routes", icon: faMapMarkerAlt, color: "#5E5CE6", onPress: () => navigation.navigate("FinishedRoutes") },
    { title: "Suggested", icon: faLightbulb, color: "#FF9F28", onPress: () => navigation.navigate("SuggestedRoutes") },
  ];

  const nearbyButtons = [
    { title: "Restaurants", icon: faUtensils, color: "#0884FA", type: "restaurants" },
    { title: "Coffee Shops", icon: faCoffee, color: "#FF9F28", type: "cafes" },
    { title: "Shops", icon: faShoppingCart, color: "#BF5AF2", type: "shops" },
    { title: "Attractions", icon: faLandmark, color: "#30D158", type: "attractions" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.caption}>Hello, {user.name}!</Text>
        <Text style={styles.textSecondary}>Routes</Text>
        <View style={styles.cardContainer}>
          {cardButtons.map((button, index) => (
            <CardButton key={index} title={button.title} icon={button.icon} color={button.color} onPress={button.onPress} />
          ))}
        </View>
        <Text style={styles.textSecondary}>Find nearby</Text>
        <View style={styles.nearbyContainer}>
          <View style={styles.nearbyButtons}>
            {nearbyButtons.map((button, index) => (
              <RoundButton
                key={index}
                title={button.title}
                icon={button.icon}
                color={button.color}
                onPress={() => handleFindNearby(button.type, button.icon, button.color)}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 17,
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  nearbyContainer: {
    alignItems: "center",
  },
  nearbyButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    width: "90%",
    alignItems: "center",
  },
  container: {
    width: "88%",
    paddingTop: 25,
  },
  caption: {
    fontSize: 34,
    color: "white",
    marginBottom: 10,
  },
});

export default Home;
