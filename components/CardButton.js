import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback } from "react-native";
import { colors } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const CardButton = ({ title, icon, color, onPress }) => {
  let scaleValue = new Animated.Value(0);

  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1.1]
  });

  let transformStyle = { ...styles.card, transform: [{ scale: cardScale }] };

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
      }}
      onPressOut={() => {
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true
        }).start();
        onPress();
      }}
    >
      <Animated.View style={transformStyle}>
        <Animated.View style={{ ...styles.iconContainer, backgroundColor: color }}>
          <FontAwesomeIcon icon={icon} style={styles.icon} size={20} />
        </Animated.View>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardButton,
    borderRadius: 10,
    width: "47%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  iconContainer: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 8
  },
  icon: {
    color: "white"
  },
  text: {
    color: colors.textPrimary,
    fontSize: 14
  }
});

export default CardButton;
