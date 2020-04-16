import React from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const LandMarkDetails = () => {
  return (
    <ImageBackground
      source={{
        url: "https://handluggageonly.co.uk/wp-content/uploads/2018/10/Hand-Luggage-Only-12.jpg",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)", "#000"]} style={{ flex: 1 }} locations={[0.2, 0.45, 0.89]}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.container}>
            <Text style={styles.title}>London</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac dictum enim. Nullam at tempor tellus, eu tincidunt
              tortor. Duis lobortis id elit et commodo. Praesent tincidunt nec lorem vel dignissim. Nullam ultricies odio id nisi malesuada
              rhoncus. Ut tincidunt vel augue ut hendrerit.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "white",
    fontSize: 17,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "85%",
    marginBottom: 40,
  },
});

export default LandMarkDetails;
