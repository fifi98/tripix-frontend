import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import SuggestedRouteCard from "../../components/SuggestedRouteCard";
import BoldText from "../../components/ui/BoldText";
import api from "../../utils/api";
import BottomMenu from "../../components/Route/BottomMenu";
import LoginSubtitle from "../../components/LoginSubtitle";

const SuggestedRoutesCreated = ({ navigation, route }) => {
  const { user } = useContext(MyContext);
  const { place } = route.params;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    api.get(`/route/suggested_route/${place}`).then((response) => {
      setRoutes(response.data);
      console.log(response.data);
    });
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate("Overview");
  };

  const handleSelect = (routeID) => {
    console.log("aa");
    // navigation.navigate("Trip", { trip: response.data });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Suggested</BoldText> routes
        </Text>
        <LoginSubtitle text="We have created three types of routes for you. Pick one to proceed" />
        {routes.length !== 0 ? (
          <ScrollView>
            <SuggestedRouteCard
              item={{
                ...routes.miniRoute,
                name: "Mini Route",
                photo_ref: routes.attractions[routes.miniRoute.landmarksNumber - 1].photo_reference,
              }}
              handleSelect={handleSelect}
            />
            <SuggestedRouteCard
              item={{
                ...routes.middleRoute,
                name: "Middle Route",
                photo_ref: routes.attractions[routes.middleRoute.landmarksNumber - 1].photo_reference,
              }}
              handleSelect={handleSelect}
            />
            <SuggestedRouteCard
              item={{
                ...routes.largeRoute,
                name: "Large Route",
                photo_ref: routes.attractions[routes.largeRoute.landmarksNumber - 1].photo_reference,
              }}
              handleSelect={handleSelect}
            />
          </ScrollView>
        ) : (
          <Text>awf</Text>
        )}
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
    color: "white",
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
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SuggestedRoutesCreated;
