import React from "react";
import { View, ImageBackground, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const LandMarkDetails = () => {
  return (
    <ImageBackground
      source={{
        url: "https://handluggageonly.co.uk/wp-content/uploads/2018/10/Hand-Luggage-Only-12.jpg"
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)", "#000"]}
        style={{ flex: 1 }}
        locations={[0.2, 0.45, 0.89]}
      >
        <Text>London</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LandMarkDetails;
