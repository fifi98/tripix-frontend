import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { colors } from "../../constants/theme";
import LandmarkCard from "../../components/LandmarkCard";
import SearchLandmarks from "../../components/Route/SearchLandmarks";
import api from "../../utils/api";
import { MyContext } from "../../context/Provider";

const WhatVisit = props => {
  const user = React.useContext(MyContext);

  const [attractions, setAttractions] = useState([]);

  const handleDetails = () => {
    props.navigation.navigate("LandmarkDetails");
  };

  useEffect(() => {
    api
      .get("/attractions/parks", {
        headers: {
          Authorization: "Bearer " + user.token
        },
        params: { location: "Zagreb" }
      })
      .then(response => setAttractions([...response.data]));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.headerBold}>What</Text>
          <Text style={styles.headerNormal}> do you want to visit?</Text>
        </View>
        <SearchLandmarks />
        <FlatList
          keyExtractor={item => item.name}
          data={attractions}
          renderItem={({ item }) => <LandmarkCard item={item} onLongPress={handleDetails} />}
        />
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
