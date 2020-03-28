import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { colors } from "../../constants/theme";
import InputField from "../../components/InputField";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LandmarkCard from "../../components/LandmarkCard";

const WhatVisit = () => {
  const testPodaci = [
    {
      key: 0,
      location: "London",
      time: 3,
      numAttractions: 3
    },
    {
      key: 1,
      location: "Paris",
      time: 3,
      numAttractions: 3
    },
    {
      key: 2,
      location: "Budapest",
      time: 3,
      numAttractions: 3
    },
    {
      key: 3,
      location: "aaa",
      time: 3,
      numAttractions: 3
    },
    {
      key: 4,
      location: "bb",
      time: 3,
      numAttractions: 3
    },
    {
      key: 5,
      location: "Zagreb",
      time: 3,
      numAttractions: 3
    }
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.headerBold}>What</Text>
          <Text style={styles.headerNormal}> do you want to visit?</Text>
        </View>
        <InputField placeholder="Search landmarks" icon={faSearch} />
        <FlatList data={testPodaci} renderItem={({ item }) => <LandmarkCard item={item} />} />
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
