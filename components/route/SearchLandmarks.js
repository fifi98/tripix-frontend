import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { categories } from "../../constants/landmarkCategories";
import { MyContext } from "../../context/Provider";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CategoryButton from "./CategoryButton";
import InputField from "../ui/InputField";
import api from "../../utils/api";

const SearchLandmarks = ({ setAttractions, searchInput, setSearchInput, setLoading }) => {
  const { newRoute } = useContext(MyContext);
  const [categoriesOpened, setCategoriesOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(5);

  const selectCategory = (id) => {
    setCategoriesOpened((old) => !old);
    if (!categoriesOpened || isNaN(id)) return;
    setSelectedCategory(id);
  };

  useEffect(() => {
    const selectedCategoryName = categories.find((c) => c.id === selectedCategory).name;
    setLoading(true);
    api
      .get("/attractions/" + selectedCategoryName, {
        params: { location: newRoute.location.split(",")[0] },
      })
      .then((response) => {
        setAttractions([...response.data]);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <View>
      <View>
        {categoriesOpened ? (
          <View style={styles.categoriesContainer}>
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
            <View style={styles.searchContainer}>
              <InputField
                placeholder="Search landmarks"
                icon={faSearch}
                value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
              />
            </View>
            <View style={styles.categoryButtonContainer}>
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
  categoriesContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    width: "82%",
  },
  categoryButtonContainer: {
    width: "15%",
    marginVertical: 10,
  },
});

export default SearchLandmarks;
