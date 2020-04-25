import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import LandmarkCard from "../../components/LandmarkCard";
import Loading from "../Loading";

const LandmarksList = ({ navigation, attractions, searchInput, loading }) => {
  const handleDetails = (item) => {
    navigation.navigate("LandmarkDetails", { landmark: item });
  };

  return (
    <View style={styles.container}>
      {loading === 1 ? (
        <Loading text="Looking for landmarks" />
      ) : (
        <View>
          {attractions.length === 0 ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Landmarks you select will be shown here</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(item) => item.place_id}
              data={attractions.filter((a) => a.name.toLowerCase().includes(searchInput.toLowerCase()))}
              renderItem={({ item }) => <LandmarkCard item={item} onLongPress={handleDetails} />}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={5}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    marginTop: 5,
    padding: 0,
  },
});

export default LandmarksList;
