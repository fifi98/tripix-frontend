import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import SuggestedRouteCard from "../../components/route/SuggestedRouteCard";
import BoldText from "../../components/ui/BoldText";
import api from "../../utils/api";
import BottomMenu from "../../components/route/BottomMenu";
import Caption from "../../components/ui/Caption";
import Loading from "../../components/ui/Loading";

const SuggestedRoutesCreated = ({ navigation, route }) => {
  const { setNewRoute } = useContext(MyContext);
  const { place } = route.params;
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState();

  useEffect(() => {
    api.get(`/route/suggested/${place}`).then((response) => {
      setRoutes(response.data);
    });
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    // Get number of attractions for selected route
    const number_attractions = routes.routes.find((route) => route.name === selectedRoute).number_attractions;

    // Get first x attractions from the attractions list
    let attractions = routes.attractions.slice(0, number_attractions);

    // Transform coordinates
    attractions = attractions.map((a) => ({ ...a, location: { lat: a.latitude, lng: a.longitude } }));

    // The first attraction is origin
    const origin = { lat: attractions[0].location.lat, long: attractions[0].location.lng };

    // The last attraction is destination
    const destination = { lat: attractions[number_attractions - 1].location.lat, long: attractions[number_attractions - 1].location.lng };

    // Add route attractions to the Context
    setNewRoute((old) => ({ ...old, origin: origin, destination: destination, attractions: attractions }));

    navigation.navigate("Overview");
  };

  const handleSelect = (name) => {
    setSelectedRoute(name);
  };

  if (routes.length === 0) return <Loading text="Creating some interesting routes for you" />;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Suggested</BoldText> routes
        </Text>
        <Caption>We have created three types of routes for you. Pick one to proceed.</Caption>
        <ScrollView>
          {routes.routes.map((route) => (
            <SuggestedRouteCard key={route.name} item={route} handleSelect={handleSelect} selected={selectedRoute == route.name} />
          ))}
        </ScrollView>
      </View>
      <BottomMenu back={handleBack} backTitle="Back" next={handleNext} nextTitle="Next" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  button: {
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  container: {
    width: "88%",
    paddingTop: 30,
    flex: 1,
    flexDirection: "column",
  },
  textContainer: {
    marginTop: 40,
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default SuggestedRoutesCreated;
