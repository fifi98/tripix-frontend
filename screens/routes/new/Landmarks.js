import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import SearchLandmarks from "../../../components/Route/SearchLandmarks";
import SegmentedControlIOS from "@react-native-community/segmented-control";
import LandmarksList from "../../../components/Route/LandmarksList";
import { MyContext } from "../../../context/Provider";
import { colors } from "../../../constants/theme";
import BottomMenu from "../../../components/Route/BottomMenu";

const WhatVisit = (props) => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { newRoute } = useContext(MyContext);

  const handleNext = () => {
    props.navigation.navigate("Start");
  };

  const handleBack = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.headerBold}>What</Text>
          <Text style={styles.headerNormal}> do you want to visit?</Text>
        </View>
        <SearchLandmarks
          setAttractions={setAttractions}
          searchInput={searchInput}
          setLoading={setLoading}
          setSearchInput={setSearchInput}
        />
        <SegmentedControlIOS
          values={["Available", "Selected"]}
          selectedIndex={selectedTab}
          onChange={(event) => setSelectedTab(event.nativeEvent.selectedSegmentIndex)}
          tintColor={"#636366"}
          activeTextColor={"#FFF"}
          textColor={"#FFF"}
        />
        <View style={{ flex: 1 }}>
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
  title: {
    flexDirection: "row",
  },
  headerBold: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  headerNormal: {
    fontSize: 22,
    color: "white",
  },
  container: {
    width: "88%",
    flex: 1,
    paddingTop: 20,
    height: "100%",
  },
});

export default WhatVisit;
