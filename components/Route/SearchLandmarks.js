import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import InputField from "../InputField";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faLandmark, faLeaf, faFootballBall, faPaw, faSchool, faChurch } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../constants/theme";
import api from "../../utils/api";
import { MyContext } from "../../context/Provider";

const CategoryButton = ({ selectCategory, icon, selected }) => {
  return (
    <TouchableOpacity onPress={selectCategory}>
      <View style={selected ? styles.selectedCategoryButton : styles.categoryButton}>
        <FontAwesomeIcon icon={icon} style={{ color: "white" }} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const SearchLandmarks = ({ setAttractions, searchInput, setSearchInput, setLoading }) => {
  const { user, newRoute } = React.useContext(MyContext);
  const [categoriesOpened, setCategoriesOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(5);

  const selectCategory = (id) => {
    setCategoriesOpened((old) => !old);
    if (!categoriesOpened || isNaN(id)) return;
    setSelectedCategory(id);
  };

  const categories = [
    { id: 0, name: "parks", icon: faLeaf },
    { id: 1, name: "stadiums", icon: faFootballBall },
    { id: 2, name: "pets", icon: faPaw },
    { id: 3, name: "schools", icon: faSchool },
    { id: 4, name: "religions", icon: faChurch },
    { id: 5, name: "landmarks", icon: faLandmark },
  ];

  useEffect(() => {
    const selectedCategoryName = categories.find((c) => c.id === selectedCategory).name;
    setLoading(1);
    api
      .get("/attractions/" + selectedCategoryName, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
        params: { location: newRoute.location },
      })
      .then((response) => {
        setAttractions([...response.data]);
        setLoading(0);
      });
  }, [selectedCategory]);

  return (
    <View>
      <View>
        {categoriesOpened ? (
          <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
            {categories
              .filter((c) => c.id !== selectedCategory)
              .map((category) => (
                <CategoryButton
                  key={category.id}
                  selectCategory={() => selectCategory(category.id)}
                  icon={category.icon}
                  selected={category.id === selectedCategory}
                />
              ))}
            <CategoryButton selectCategory={selectCategory} icon={categories.find((c) => c.id === selectedCategory).icon} selected />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ width: "82%" }}>
              <InputField
                placeholder="Search landmarks"
                icon={faSearch}
                value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
              />
            </View>
            <View style={{ width: "15%", marginVertical: 10 }}>
              <CategoryButton selectCategory={selectCategory} icon={categories.find((category) => category.id === selectedCategory).icon} />
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
    alignItems: "stretch",
  },
  categoryButton: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  selectedCategoryButton: {
    backgroundColor: "#636366",
    borderRadius: 10,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
});

export default SearchLandmarks;
