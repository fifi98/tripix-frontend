import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import LandmarkCard from "../../components/LandmarkCard";

const LandmarksList = ({ navigation, attractions, searchInput, loading }) => {
  const handleDetails = () => {
    navigation.navigate("LandmarkDetails");
  };

  console.log("aAAAAAAA", attractions);
  return (
    <View>
      {loading === 1 ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {attractions.length === 0 ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Landmarks you select will be shown here</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(item) => item.photo_reference}
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
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LandmarksList;
