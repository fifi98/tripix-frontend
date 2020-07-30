import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../constants/theme";

const CategoryButton = ({ selectCategory, icon, selected }) => {
  return (
    <TouchableOpacity onPress={selectCategory}>
      <View style={selected ? styles.selectedCategoryButton : styles.categoryButton}>
        <FontAwesomeIcon icon={icon} style={styles.icon} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "white",
  },
  categoryButton: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  selectedCategoryButton: {
    backgroundColor: "#636366",
    borderRadius: 10,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
});

export default CategoryButton;
