import React from "react";
import { View, Button, StyleSheet } from "react-native";

const BottomMenu = ({ back, next, backTitle, nextTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title={backTitle} onPress={back} />
        <Button title={nextTitle} onPress={next} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderTopColor: "#3D3D3D",
    backgroundColor: "#161616",
    borderTopWidth: 0.3,
  },
});

export default BottomMenu;
