import React, { useState } from "react";
import { ScrollView } from "react-native";
import NearbyLocations from "../../components/route/NearbyLocations";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import AutoCompleteItem from "../../components/route/AutoCompleteItem";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/ui/InputField";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Caption from "../../components/ui/Caption";
import DateInput from "../../components/ui/DateInput";

const LocationInput = ({ handleLocation, setNewRoute, inputError }) => {
  const [showAutoComplete, setShowAutoComplete] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePress = () => {
    setShowDatePicker((old) => !old);
  };

  const handleConfirmDate = (date) => {
    setNewRoute((old) => ({ ...old, date: date }));
    handleDatePress();
  };

  return (
    <GoogleAutoComplete apiKey="AIzaSyCFOkhSfIYP_i1w5q_Lk-3Rg81dAsCSwcE" debounce={300} queryTypes="(cities)">
      {({ inputValue, handleTextChange, locationResults }) => {
        const onAutoCompleteItemPress = (location) => {
          handleTextChange(location);
          handleLocation(location);
          setShowAutoComplete(false);
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
              <ScrollView style={{ backgroundColor: colors.inputField, borderRadius: 10, padding: 10 }} keyboardShouldPersistTaps="always">
                {locationResults.map((place, index) => (
                  <AutoCompleteItem key={index} location={place.description} handleTextChange={handleTextChange} />
                ))}
              </ScrollView>
            )}

            <DateInput placeholder="Starts" icon={faMapMarkerAlt} onPress={handleDatePress} />
            <Caption>Nearby locations</Caption>
            <NearbyLocations handleTextChange={onAutoCompleteItemPress} />
            <DateTimePickerModal isVisible={showDatePicker} mode={"date"} onCancel={handleDatePress} onConfirm={handleConfirmDate} />
          </>
        );
      }}
    </GoogleAutoComplete>
  );
};

export default LocationInput;
