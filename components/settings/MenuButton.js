import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MenuButton = ({ button }) => {
  return (
    <TouchableOpacity key={button.name} onPress={button.onPress}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ marginVertical: 10, flexDirection: "row", alignItems: "center" }}>
          <FontAwesomeIcon icon={button.icon} style={{ color: "white", marginRight: 10 }} />
          <Text style={{ color: "white", fontSize: 18 }}>{button.title}</Text>
        </View>
        <FontAwesomeIcon icon={faChevronRight} style={{ color: "white", marginRight: 10 }} />
      </View>
    </TouchableOpacity>
  );
};

export default MenuButton;
