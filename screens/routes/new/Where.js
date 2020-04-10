import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import InputField from "../../../components/InputField";
import api from "../../../utils/api";
import LoginSubtitle from "../../../components/LoginSubtitle";
import LocationCard from "../../../components/LocationCard";
import { colors } from "../../../constants/theme";
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import { ScrollView } from "react-native-gesture-handler";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateInput from "../../../components/DateInput";

const NewRoute = (props) => {
  const { user, setNewRoute, newRoute } = React.useContext(MyContext);

  const [nearbyCities, setNearbyCities] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLocation = (location) => {
    setNewRoute((old) => ({ ...old, location: location }));
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.longitude);
        console.log(position.coords.latitude);
        api
          .get("/nearby/cities", {
            headers: {
              Authorization: "Bearer " + user.token,
            },
            params: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          })
          .then((results) => setNearbyCities(results.data));
      },
      (error) => Alert.alert(error.message)
    );
  }, []);

  const handleNext = () => {
    props.navigation.navigate("WhatVisit");
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Where are you going?</Text>
        <InputField
          placeholder="e.g. London"
          icon={faMapMarkerAlt}
          value={newRoute.location}
          onChangeText={(text) => handleLocation(text)}
        />
        <DateInput placeholder="Starts" icon={faMapMarkerAlt} />
        <LoginSubtitle text="Nearby locations" />

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {nearbyCities.map((city) => (
            <LocationCard key={city.photo_reference} city={city} handleNext={handleNext} />
          ))}
        </ScrollView>
        <DateTimePickerModal isVisible={showDatePicker} mode={"date"} />
      </View>

      <View style={{ width: "100%" }}>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleBack} />
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
    alignItems: "center",
  },
  container: {
    width: "85%",
    paddingTop: 30,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderTopColor: "#3D3D3D",
    backgroundColor: "#161616",
    borderTopWidth: 0.3,
  },
});
export default NewRoute;
