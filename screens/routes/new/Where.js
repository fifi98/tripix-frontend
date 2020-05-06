import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputField from "../../../components/ui/InputField";
import BottomMenu from "../../../components/Route/BottomMenu";
import DateInput from "../../../components/ui/DateInput";
import Subtitle from "../../../components/ui/Subtitle";
import BoldText from "../../../components/ui/BoldText";
import Caption from "../../../components/ui/Caption";
import { colors } from "../../../constants/theme";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import NearbyLocations from "../../../components/Route/NearbyLocations";

const NewRoute = ({ navigation }) => {
  const { setNewRoute, newRoute } = useContext(MyContext);
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
  }, []);

  const handleNext = () => {
    if (newRoute.location.length == 0) {
      setInputError(true);
      Alert.alert("You have to enter your trip location!");
      return;
    }
    navigation.navigate("WhatVisit");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Subtitle>
            <BoldText>Where</BoldText> are you going?
          </Subtitle>
          <InputField
            placeholder="e.g. London"
            icon={faMapMarkerAlt}
            value={newRoute.location}
            onChangeText={(text) => handleLocation(text)}
            error={inputError}
          />
          <DateInput placeholder="Starts" icon={faMapMarkerAlt} onPress={handleDatePress} />
          <Caption>Nearby locations</Caption>
          <NearbyLocations handleNext={handleNext} />
          <DateTimePickerModal isVisible={showDatePicker} mode={"date"} onCancel={handleDatePress} onConfirm={handleConfirmDate} />
        </View>

        <BottomMenu back={handleBack} backTitle="Cancel" next={handleNext} nextTitle="Next" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
});
export default NewRoute;
