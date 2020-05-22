import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { colors } from "../../constants/theme";

const Sheet = ({ children, title, buttonText, buttonHandler }) => {
  const sheet = useRef(null);

  const handleShowAll = () => {
    sheet.current.snapTo(0);

    console.log(sheet.current.heightOfContent);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={buttonHandler ? buttonHandler : handleShowAll}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderInner = () => <View style={styles.panel}>{children}</View>;

  return (
    <BottomSheet
      ref={sheet}
      snapPoints={["87%", "36%", "4.5%"]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={1}
      enabledContentGestureInteraction={false}
    />
  );
};

const styles = StyleSheet.create({
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginHorizontal: 20,
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#69696D",
    marginBottom: 9,
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default Sheet;
