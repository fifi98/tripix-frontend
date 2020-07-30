import React, { useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";
import { faSearch, faMapMarkerAlt, faCompass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../constants/theme";
import { MyContext } from "../../../context/Provider";
import InputField from "../../../components/ui/InputField";
import PositionCard from "../../../components/route/PositionCard";
import BottomMenu from "../../../components/route/BottomMenu";
import BoldText from "../../../components/ui/BoldText";
import Subtitle from "../../../components/ui/Subtitle";

const Start = ({ navigation }) => {
  const { setNewRoute, newRoute } = useContext(MyContext);
  const [searchInput, setSearchInput] = useState("");

  const handleChoose = (item) => {
    if (item.default) {
      Alert.alert("Coming soon in the following versions!");
      return;
    }
    setNewRoute((old) => ({ ...old, origin: { lat: item.location.lat, long: item.location.lng } }));
  };

  const handleNext = () => {
    if (!newRoute.origin) {
      Alert.alert("You have to select a location in order to continue!");
      return;
    }
    navigation.navigate("End");
  };

  const defaultButtons = [
    { name: "My current location", icon: faMapMarkerAlt, default: true },
    { name: "Pick a landmark for me", icon: faCompass, default: true },
  ];

  const renderHeader = () => {
    return searchInput.length === 0 ? (
      defaultButtons.map((item, index) => <PositionCard item={item} onPress={handleChoose} key={index} />)
    ) : (
      <></>
    );
  };

  const isChecked = (item) => {
    if (!newRoute.origin) return false;
    return newRoute.origin.lat === item.location.lat && newRoute.origin.long === item.location.lng;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Subtitle>
          <BoldText>Where</BoldText> do you want your trip to start from?
        </Subtitle>

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

      <BottomMenu back={() => navigation.goBack()} backTitle="Back" next={handleNext} nextTitle="Next" />
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
});
export default Start;
