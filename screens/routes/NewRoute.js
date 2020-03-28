import React from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";

import InputField from "../../components/InputField";
import api from "../../utils/api";
import LoginSubtitle from "../../components/LoginSubtitle";
import LocationCard from "../../components/LocationCard";
import { colors } from "../../constants/theme";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";
import { FlatList } from "react-native-gesture-handler";

const NewRoute = props => {
  const user = React.useContext(MyContext);

  const dummyData = [
    { id: 1, location: "Varazdin" },
    { id: 2, location: "Zagreb" }
  ];

  const handleNext = () => {
    api
      .get("/users", {
        headers: {
          Authorization: "Bearer " + user.token
        }
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
    props.navigation.navigate("WhatVisit");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Where are you going?</Text>
        <InputField placeholder="e.g. London" icon={faMapMarkerAlt} />
        <InputField placeholder="e.g. London" icon={faMapMarkerAlt} />
        <LoginSubtitle text="Nearby locations" />

        <FlatList horizontal data={dummyData} renderItem={({ item }) => <LocationCard />} horizontal={true} />

        <View style={styles.buttons}>
          <Button title="Cancel" onPress={handleNext} />
          <Button title="Next" onPress={handleNext} />
        </View>
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
  container: {
    width: "85%",
    paddingTop: 30
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default NewRoute;
