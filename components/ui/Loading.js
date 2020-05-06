import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ text }) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>{text}</Text>
      <ActivityIndicator style={styles.loadingIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  loadingText: {
    color: "white",
  },
  loadingIndicator: {
    marginHorizontal: 10,
  },
});

export default Loading;
