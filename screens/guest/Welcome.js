import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { MyContext } from "../../context/Provider";
import AppIntroSlider from "react-native-app-intro-slider";

const Welcome = () => {
  const { user } = useContext(MyContext);
  console.log(user.welcomeScreen);
  const slides = [
    {
      key: "1",
      title: "Welcome!",
      text: "We are glad you downloaded Tripix! Swipe right to see how Tripix can help you with planning your trips!",
      image: require("../../assets/logo.png"),
    },
    {
      key: "2",
      title: "1. Pick a location",
      text: "Do you have some awesome place in mind you want to visit? Tell us where that place is!",
      image: require("../../assets/step1.png"),
    },
    {
      key: "3",
      title: "2. Choose landmarks",
      text:
        "We will show you some interesting landmarks you might want to visit during your trip. You will be able to choose which landmarks you want to add to your trip!",
      image: require("../../assets/step2.png"),
    },
    {
      key: "4",
      title: "3. Get the route",
      text: "Tripix will generate the optimal route for you containing all the landmarks you had selected.",
      image: require("../../assets/step3.png"),
    },
    {
      key: "5",
      title: "4. Start your trip",
      text: "Go to the trip location and track your progress in following the route Tripix made for you!",
      image: require("../../assets/step4.png"),
    },
  ];

  renderItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.slide}>
        <View style={styles.content}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={() => user.passedWelcome()}
      onSkip={() => user.passedWelcome()}
      showSkipButton
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#73BF45",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 32,
    resizeMode: "contain",
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    fontSize: 17,
  },
  title: {
    fontSize: 34,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default Welcome;
