import React, { useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SearchLandmarks from "../../../components/route/SearchLandmarks";
import SegmentedControl from "@react-native-community/segmented-control";
import LandmarksList from "../../../components/route/LandmarksList";
import BottomMenu from "../../../components/route/BottomMenu";
import BoldText from "../../../components/ui/BoldText";
import Subtitle from "../../../components/ui/Subtitle";
import { MyContext } from "../../../context/Provider";
import { colors } from "../../../constants/theme";

const WhatVisit = (props) => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { newRoute, setNewRoute } = useContext(MyContext);

  const handleNext = () => {
    props.navigation.navigate("Start");
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Subtitle>
          <BoldText>What</BoldText> do you want to visit?
        </Subtitle>
        <SearchLandmarks
          setAttractions={setAttractions}
          searchInput={searchInput}
          setLoading={setLoading}
          setSearchInput={setSearchInput}
        />
        <SegmentedControl
          values={["Available", "Selected"]}
          selectedIndex={selectedTab}
          onChange={(event) => setSelectedTab(event.nativeEvent.selectedSegmentIndex)}
          tintColor={"#636366"}
          activeTextColor={"#FFF"}
          textColor={"#FFF"}
          backgroundColor={"#212123"}
        />
        <View style={styles.listContainer}>
          {selectedTab ? (
            <LandmarksList attractions={newRoute.attractions} loading={loading} searchInput={searchInput} {...props} />
          ) : (
            <LandmarksList attractions={attractions} loading={loading} searchInput={searchInput} {...props} />
          )}
        </View>
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
    flex: 1,
    paddingTop: 20,
    height: "100%",
  },
  listContainer: {
    flex: 1,
  },
});

export default WhatVisit;
