import React from "react";
import { View, StyleSheet, Platform, Text, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

const BackButton = ({ onPress }) => {
  if (Platform.OS === "ios")
    return (
      <View style={styles.container}>
        <HeaderBackButton onPress={onPress} />
      </View>
    );

  return (
    <View style={styles.androidContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -10,
    marginBottom: 2,
  },
  text: {
    fontSize: 18,
    color: "#0077F9",
  },
  androidContainer: {
    marginBottom: 2,
  },
});

export default BackButton;
