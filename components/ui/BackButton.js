import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

const BackButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <HeaderBackButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: -10,
    marginBottom: 2,
  },
});

export default BackButton;
