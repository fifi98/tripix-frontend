import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";
import InputField from "../../../components/InputField";
import LoginSubtitle from "../../../components/LoginSubtitle";
import LocationCard from "../../../components/LocationCard";
import Geolocation from "@react-native-community/geolocation";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateInput from "../../../components/DateInput";
import api from "../../../utils/api";
import { colors } from "../../../constants/theme";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import { ScrollView } from "react-native-gesture-handler";

const NewRoute = (props) => {
  const { setNewRoute, newRoute } = React.useContext(MyContext);

  const [nearbyCities, setNearbyCities] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLocation = (location) => {
    setNewRoute((old) => ({ ...old, location: location }));
  };

  const handleDatePress = () => {
    setShowDatePicker((old) => !old);
  };

  const handleConfirmDate = (date) => {
    setNewRoute((old) => ({ ...old, date: date }));
    handleDatePress();
  };

  useEffect(() => {
    setNewRoute((old) => ({ ...old, date: new Date() }));

    Geolocation.getCurrentPosition(
      (position) => {
        api
          .get("/nearby/cities", {
            params: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          })
          .then((results) => setNearbyCities(results.data))
          .catch((err) => console.log(err));
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
        <DateInput placeholder="Starts" icon={faMapMarkerAlt} onPress={handleDatePress} />
        <LoginSubtitle text="Nearby locations" />

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {nearbyCities.map((city) => (
            <LocationCard key={city.photo_reference} city={city} handleNext={handleNext} />
          ))}
        </ScrollView>
        <DateTimePickerModal isVisible={showDatePicker} mode={"date"} onCancel={handleDatePress} onConfirm={handleConfirmDate} />
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
    width: "88%",
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
