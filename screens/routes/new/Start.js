import React, { useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView, FlatList } from "react-native";
import { faSearch, faMapMarkerAlt, faCompass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../constants/theme";
import { MyContext } from "../../../context/Provider";
import InputField from "../../../components/InputField";
import PositionCard from "../../../components/Route/PositionCard";

const Start = (props) => {
  const { user, setNewRoute, newRoute } = React.useContext(MyContext);
  const [searchInput, setSearchInput] = useState("");

  const handleChoose = (item) => {
    setNewRoute((old) => ({ ...old, origin: { lat: item.location.lat, long: item.location.lng } }));
    console.log("a");
  };

  const handleNext = () => {
    props.navigation.navigate("End");
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  const defaultButtons = [
    { place_id: "0", name: "My current location", icon: faMapMarkerAlt, default: true },
    { place_id: "1", name: "Pick a landmark for me", icon: faCompass, default: true },
  ];

  const renderHeader = () => {
    return searchInput.length === 0 ? defaultButtons.map((item) => <PositionCard item={item} />) : <></>;
  };

  const isChecked = (item) => {
    if (!newRoute.origin) return false;
    return newRoute.origin.lat === item.location.lat && newRoute.origin.long === item.location.lng;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Where do you want your trip to start from?</Text>
        <InputField placeholder="Search landmarks" icon={faSearch} value={searchInput} onChangeText={(text) => setSearchInput(text)} />

        <FlatList
          keyExtractor={(item) => item.place_id}
          ListHeaderComponent={renderHeader}
          data={newRoute.attractions.filter((a) => a.name.toLowerCase().includes(searchInput.toLowerCase()))}
          renderItem={({ item }) => <PositionCard item={item} onPress={handleChoose} selected={isChecked(item)} />}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </View>

      <View style={{ width: "100%" }}>
        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={handleBack} />
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
export default Start;
