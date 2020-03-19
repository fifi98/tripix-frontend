import React from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { colors } from "../../constants/theme";
import RouteCard from "../../components/RouteCard";

const PlannedRoutes = () => {
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
    <View style={styles.screen}>
      <View style={styles.container}>
        <Button style={styles.button} title="Back" />
        <View style={styles.title}>
          <Text style={styles.headerBold}>Planned</Text>
          <Text style={styles.headerNormal}> routes</Text>
        </View>
        <FlatList data={[{ key: "London" }, { key: "Paris" }]} renderItem={({ item }) => <RouteCard item={item} />} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: "20%",
    alignItems: "center"
  },
  button: {
    justifyContent: "flex-end"
  },
  title: {
    flexDirection: "row"
  },
  headerBold: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold"
  },
  headerNormal: {
    fontSize: 34,
    color: "white"
  },
  container: {
    width: "85%"
  }
});

export default PlannedRoutes;
