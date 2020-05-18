import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

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
    justifyContent: "center",
    height: "100%",
    flexDirection: "row",
    backgroundColor: colors.background,
  },
  loadingText: {
    color: "white",
  },
  loadingIndicator: {
    marginHorizontal: 10,
  },
});

export default Loading;
