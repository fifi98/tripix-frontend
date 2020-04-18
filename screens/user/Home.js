import React from "react";
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
  const { user } = React.useContext(MyContext);

  console.log(user);

  const handleFindNearby = (type) => {
    navigation.navigate("FindNearby", { type: type });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.caption}>Hello, Filip!</Text>
        <Text style={styles.textSecondary}>Routes</Text>
        <View style={styles.cardContainer}>
          <CardButton
            title="New route"
            icon={faPlus}
            color="#FE375F"
            onPress={() => navigation.navigate("NewRoute", {}, { mode: "modal" })}
          />
          <CardButton title="Planned routes" icon={faRoute} color="#63D2FD" onPress={() => navigation.navigate("PlannedRoutes")} />
          <CardButton title="Finished routes" icon={faMapMarkerAlt} color="#5E5CE6" onPress={() => navigation.navigate("FinishedRoutes")} />
          <CardButton title="Suggested" icon={faLightbulb} color="#FF9F28" onPress={() => navigation.navigate("SuggestedRoutes")} />
        </View>
        <Text style={styles.textSecondary}>Find nearby</Text>
        <View style={styles.nearbyContainer}>
          <View style={styles.nearbyButtons}>
            <RoundButton text="Restaurants" color="#0884FA" icon={faUtensils} onPress={() => handleFindNearby("restaurants")} />
            <RoundButton text="Coffee Shops" color="#FF9F28" icon={faCoffee} onPress={() => handleFindNearby("cafes")} />
            <RoundButton text="Shops" color="#BF5AF2" icon={faShoppingCart} />
            <RoundButton text="Attractions" color="#30D158" icon={faLandmark} />
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
