import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView, FlatList } from "react-native";
import InputField from "../../../components/InputField";
import { colors } from "../../../constants/theme";
import { faSearch, faMapMarkerAlt, faCompass } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../../context/Provider";
import PositionCard from "../../../components/Route/PositionCard";
import BottomMenu from "../../../components/Route/BottomMenu";

const End = (props) => {
  const { setNewRoute, newRoute } = useContext(MyContext);
  const [searchInput, setSearchInput] = useState("");

  const handleChoose = (item) => {
    setNewRoute((old) => ({ ...old, destination: { lat: item.location.lat, long: item.location.lng } }));
  };

  const handleNext = () => {
    props.navigation.navigate("Overview");
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  const defaultButtons = [
    { name: "My current location", icon: faMapMarkerAlt, default: true },
    { name: "Pick a landmark for me", icon: faCompass, default: true },
  ];

  const renderHeader = () => {
    return searchInput.length === 0 ? defaultButtons.map((item, index) => <PositionCard item={item} key={index} />) : <></>;
  };

  const isChecked = (item) => {
    if (!newRoute.destination) return false;
    return newRoute.destination.lat === item.location.lat && newRoute.destination.long === item.location.lng;
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Where do you want your trip to end?</Text>
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

      <BottomMenu back={handleBack} backTitle="Back" next={handleNext} nextTitle="Next" />
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
export default End;
