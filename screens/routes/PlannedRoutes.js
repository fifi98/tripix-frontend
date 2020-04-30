import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import RouteCard from "../../components/RouteCard";
import InputField from "../../components/InputField";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";
import { HeaderBackButton } from "@react-navigation/stack";
import BoldText from "../../components/ui/BoldText";

const PlannedRoutes = ({ navigation }) => {
  const { user } = useContext(MyContext);
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get(`/route/planned_routes/${user.user_id}`)
      .then((response) => setRoutes(response.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  const handleSelect = (routeID) => {
    api.get(`/route/specific_route/${routeID}`).then((response) => {
      navigation.navigate("Trip", { trip: response.data });
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={{ marginLeft: -10 }}>
          <HeaderBackButton onPress={() => navigation.navigate("Home")} />
        </View>
        <Text style={styles.title}>
          <BoldText>Planned</BoldText> routes
        </Text>
        <InputField placeholder="Search location" icon={faSearch} onChangeText={(text) => setSearch(text)} value={search} />
        {routes.length == 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Routes you will plan will be shown here</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(item) => item.route_id.toString()}
            data={routes.filter((route) => route.location.toLowerCase().includes(search.toLowerCase()))}
            renderItem={({ item }) => <RouteCard item={item} handleSelect={handleSelect} />}
          />
        )}
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
  button: {
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
  container: {
    width: "85%",
    paddingTop: 10,
    height: "100%",
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

export default PlannedRoutes;
