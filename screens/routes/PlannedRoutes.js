import React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import { colors } from "../../constants/theme";
import RouteCard from "../../components/RouteCard";
import { HeaderBackButton } from "@react-navigation/stack";
import InputField from "../../components/InputField";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PlannedRoutes = props => {
  const testPodaci = [
    {
      key: 0,
      location: "London",
      time: 3,
      numAttractions: 3
    },
    {
      key: 1,
      location: "Paris",
      time: 3,
      numAttractions: 3
    }
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={{ marginLeft: -10 }}>
          <HeaderBackButton onPress={() => props.navigation.goBack()} />
        </View>
        <View style={styles.title}>
          <Text style={styles.headerBold}>Planned</Text>
          <Text style={styles.headerNormal}> routes</Text>
        </View>
        <InputField placeholder="Search location" icon={faSearch} />
        <FlatList data={testPodaci} renderItem={({ item }) => <RouteCard item={item} />} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  button: {
    justifyContent: "flex-end"
  },
  title: {
    flexDirection: "row"
  },
  headerBold: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold"
  },
  headerNormal: {
    fontSize: 30,
    color: "white"
  },
  container: {
    width: "85%",
    paddingTop: 10,
    height: "100%"
  }
});

export default PlannedRoutes;
