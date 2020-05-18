import React from "react";
import { View, StyleSheet, Platform, Text, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import LinkButton from "./LinkButton";

const BackButton = ({ onPress }) => {
  if (Platform.OS === "ios")
    return (
      <View style={styles.container}>
        <HeaderBackButton onPress={onPress} />
      </View>
    );

  return <LinkButton text="Back" onPress={onPress} />;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -10,
    marginBottom: 2,
  },
});

export default BackButton;
