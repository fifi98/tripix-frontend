import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../../constants/theme";
import SearchLandmarks from "../../components/Route/SearchLandmarks";
import SegmentedControlIOS from "@react-native-community/segmented-control";
import LandmarksList from "../../components/Route/LandmarksList";
import { MyContext } from "../../context/Provider";

const WhatVisit = (props) => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const { newRoute } = React.useContext(MyContext);

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
          tintColor={"#FFF"}
          activeTextColor={"#000"}
        />
        {selectedTab ? (
          <LandmarksList attractions={newRoute.attractions} loading={loading} searchInput={searchInput} {...props} />
        ) : (
          <LandmarksList attractions={attractions} loading={loading} searchInput={searchInput} {...props} />
        )}
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
    width: "85%",
    paddingTop: 30,
    height: "100%",
  },
});

export default WhatVisit;
