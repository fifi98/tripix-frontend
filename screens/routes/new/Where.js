import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AutoCompleteItem from "../../../components/route/AutoCompleteItem";
import NearbyLocations from "../../../components/route/NearbyLocations";
import InputField from "../../../components/ui/InputField";
import BottomMenu from "../../../components/route/BottomMenu";
import DateInput from "../../../components/ui/DateInput";
import Subtitle from "../../../components/ui/Subtitle";
import BoldText from "../../../components/ui/BoldText";
import Caption from "../../../components/ui/Caption";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import { API_KEY } from "react-native-dotenv";
import { colors } from "../../../constants/theme";

const NewRoute = ({ navigation }) => {
  const { setNewRoute, newRoute } = useContext(MyContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(true);

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
      Alert.alert("You have to select your trip location!");
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
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <Subtitle>
            <BoldText>Where</BoldText> are you going?
          </Subtitle>
          <GoogleAutoComplete apiKey={API_KEY} debounce={300} queryTypes="(cities)">
            {({ inputValue, handleTextChange, locationResults }) => {
              const onAutoCompleteItemPress = (location) => {
                handleTextChange(location);
                handleLocation(location);
                setShowAutoComplete(false);
                Keyboard.dismiss();
              };

              const nearbyPress = (location) => {
                handleTextChange(location);
                setShowAutoComplete(true);
                Keyboard.dismiss();
              };

              return (
                <>
                  <InputField
                    placeholder="e.g. London"
                    icon={faMapMarkerAlt}
                    value={inputValue}
                    onChangeText={(text) => {
                      handleTextChange(text);
                      setShowAutoComplete(true);
                    }}
                    error={inputError}
                  />

                  {inputValue.length != 0 && showAutoComplete && locationResults != 0 && (
                    <ScrollView style={styles.autoCompleteContainer} keyboardShouldPersistTaps="always">
                      {locationResults.map((place, index) => (
                        <AutoCompleteItem key={index} location={place.description} handleTextChange={onAutoCompleteItemPress} />
                      ))}
                    </ScrollView>
                  )}

                  <DateInput placeholder="Starts" icon={faMapMarkerAlt} onPress={handleDatePress} />
                  <Caption>Nearby locations</Caption>
                  <NearbyLocations handleTextChange={nearbyPress} />
                  <DateTimePickerModal isVisible={showDatePicker} mode={"date"} onCancel={handleDatePress} onConfirm={handleConfirmDate} />
                </>
              );
            }}
          </GoogleAutoComplete>
        </ScrollView>

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
  autoCompleteContainer: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    padding: 10,
  },
});
export default NewRoute;
