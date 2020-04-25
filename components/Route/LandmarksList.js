import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import LandmarkCard from "../../components/LandmarkCard";

const LandmarksList = ({ navigation, attractions, searchInput, loading }) => {
  const handleDetails = (item) => {
    navigation.navigate("LandmarkDetails", { landmark: item });
  };

  return (
    <View style={styles.container}>
      {loading === 1 ? (
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>Loading some interesting landmarks</Text>
          <ActivityIndicator style={{ marginHorizontal: 10 }} />
        </View>
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
  loadingText: {
    color: "white",
  },
});

export default LandmarksList;
