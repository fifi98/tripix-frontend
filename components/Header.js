import React from "react";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = props => {
  return (
    <View style={{ height: 100, paddingTop: 50, backgroundColor: "red" }}>
      <Ionicons
        name="ios-arrow-back"
        size={35}
        onPress={() => {
          props.navigation.goBack();
        }}
      />

      <Text>Planned routes</Text>
    </View>
  );
};

export default Header;
