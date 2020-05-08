import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList, Alert } from "react-native";
import BackButton from "../../components/ui/BackButton";
import InputField from "../../components/ui/InputField";
import RouteCard from "../../components/route/RouteCard";
import BoldText from "../../components/ui/BoldText";
import Loading from "../../components/ui/Loading";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const FinishedRoutes = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/route/finished")
      .then((response) => setRoutes(response.data))
      .catch(() => Alert.alert("Error while loading your routes"))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (routeID) => {
    api.get(`/route/${routeID}`).then((response) => {
      navigation.navigate("Trip", { trip: response.data });
    });
  };

  if (loading) return <Loading text="Loading your finished routes" />;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <BackButton onPress={() => navigation.navigate("Home")} />
        <Text style={styles.title}>
          <BoldText>Finished</BoldText> routes
        </Text>
        <InputField placeholder="Search location" icon={faSearch} onChangeText={(text) => setSearch(text)} value={search} />
        {routes.length == 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Routes you will finish will be shown here</Text>
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
    width: "88%",
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

export default FinishedRoutes;
