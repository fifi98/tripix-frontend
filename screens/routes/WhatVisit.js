import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { colors } from "../../constants/theme";
import LandmarkCard from "../../components/LandmarkCard";
import SearchLandmarks from "../../components/Route/SearchLandmarks";

const WhatVisit = props => {
  const [attractions, setAttractions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleDetails = () => {
    props.navigation.navigate("LandmarkDetails");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.headerBold}>What</Text>
          <Text style={styles.headerNormal}> do you want to visit?</Text>
        </View>
        <SearchLandmarks setAttractions={setAttractions} searchInput={searchInput} setSearchInput={setSearchInput} />
        {attractions.length === 0 ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            keyExtractor={item => item.photo_reference}
            data={attractions.filter(a => a.name.toLowerCase().includes(searchInput.toLowerCase()))}
            renderItem={({ item }) => <LandmarkCard item={item} onLongPress={handleDetails} />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  title: {
    flexDirection: "row"
  },
  headerBold: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold"
  },
  headerNormal: {
    fontSize: 22,
    color: "white"
  },
  container: {
    width: "85%",
    paddingTop: 30,
    height: "100%"
  }
});

export default WhatVisit;
