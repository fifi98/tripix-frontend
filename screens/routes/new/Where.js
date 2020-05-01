import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LoginSubtitle from "../../../components/LoginSubtitle";
import LocationCard from "../../../components/LocationCard";
import Geolocation from "@react-native-community/geolocation";
import InputField from "../../../components/InputField";
import BottomMenu from "../../../components/Route/BottomMenu";
import DateInput from "../../../components/DateInput";
import BoldText from "../../../components/ui/BoldText";
import api from "../../../utils/api";
import { colors } from "../../../constants/theme";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import { ScrollView } from "react-native-gesture-handler";

const NewRoute = (props) => {
  const { setNewRoute, newRoute } = useContext(MyContext);

  const [nearbyCities, setNearbyCities] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleLocation = (location) => {
    setNewRoute((old) => ({ ...old, location: location }));
    setInputError(false);
  };

  const handleDatePress = () => {
    setShowDatePicker((old) => !old);
  };

  const handleConfirmDate = (date) => {
    setNewRoute((old) => ({ ...old, date: date }));
    handleDatePress();
  };

  useEffect(() => {
    setNewRoute({ attractions: [], date: new Date(), location: "" });

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
    if (newRoute.location.length == 0) {
      setInputError(true);
      Alert.alert("You have to enter your trip location!");
      return;
    }

    props.navigation.navigate("WhatVisit");
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Where</BoldText> are you going?
        </Text>
        <InputField
          placeholder="e.g. London"
          icon={faMapMarkerAlt}
          value={newRoute.location}
          onChangeText={(text) => handleLocation(text)}
          error={inputError}
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

      <BottomMenu back={handleBack} backTitle="Cancel" next={handleNext} nextTitle="Next" />
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
});
export default NewRoute;
