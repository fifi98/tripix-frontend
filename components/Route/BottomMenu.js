import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";
import LinkButton from "../ui/LinkButton";

const BottomMenu = ({ back, next, backTitle, nextTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <LinkButton text={backTitle} onPress={back} />
        <LinkButton text={nextTitle} onPress={next} />
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
    borderTopColor: colors.bottomMenu.border,
    backgroundColor: colors.bottomMenu.background,
    borderTopWidth: 0.3,
  },
});

export default BottomMenu;
