import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { colors } from "../constants/theme";

const Sheet = ({ children, title, buttonText }) => {
  const sheet = useRef(null);

  const handleShowAll = () => {
    sheet.current.snapTo(0);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "gray",
          borderBottomWidth: 0.5,
          paddingBottom: 5,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: colors.textSecondary }}>{title}</Text>
        <TouchableOpacity onPress={handleShowAll}>
          <Text style={{ color: "#007AFF", fontSize: 16 }}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderInner = () => <View style={styles.panel}>{children}</View>;

  return (
    <BottomSheet ref={sheet} snapPoints={["87%", "36%", "4.5%"]} renderContent={renderInner} renderHeader={renderHeader} initialSnap={1} />
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    left: 22,
    top: 34,
  },
  icon: {
    color: "white",
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#313233",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#313233",
    shadowColor: "#000000",
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#69696D",
    marginBottom: 9,
  },
});

export default Sheet;
