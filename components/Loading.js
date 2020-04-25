import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ text }) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>{text}</Text>
      <ActivityIndicator style={{ marginHorizontal: 10 }} />
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
});

export default Loading;
