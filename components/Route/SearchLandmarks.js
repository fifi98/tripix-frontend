import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../InputField";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faLandmark,
  faLeaf,
  faFootballBall,
  faPaw,
  faSchool,
  faChurch
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../constants/theme";

const CategoryButton = ({ selectCategories, icon }) => {
  return (
    <TouchableOpacity onPress={selectCategories}>
      <View style={styles.categoryButton}>
        <FontAwesomeIcon icon={icon} style={{ color: "white" }} size={24} />
      </View>
    </TouchableOpacity>
  );
};

const SearchLandmarks = () => {
  const [categoriesOpened, setCategoriesOpened] = useState(false);

  const selectCategories = () => {
    setCategoriesOpened(old => !old);
  };

  const categories = [
    { name: "parks", icon: faLeaf },
    { name: "stadiums", icon: faFootballBall },
    { name: "pets", icon: faPaw },
    { name: "schools", icon: faSchool },
    { name: "churches", icon: faChurch },
    { name: "landmarks", icon: faLandmark }
  ];

  return (
    <View>
      <View>
        {categoriesOpened ? (
          <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
            {categories.map(category => (
              <CategoryButton selectCategories={selectCategories} icon={category.icon} />
            ))}
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ width: "80%" }}>
              <InputField placeholder="Search landmarks" icon={faSearch} />
            </View>
            <View style={{ width: "15%", marginVertical: 10 }}>
              <CategoryButton selectCategories={selectCategories} icon={faChurch} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  categoryButton: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    width: 50
  }
});

export default SearchLandmarks;
