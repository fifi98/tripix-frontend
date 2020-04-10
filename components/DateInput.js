import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { colors } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const DateInput = ({ icon, placeholder, value, onChangeText, isPassword, numbers }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert("a")}>
      <View style={styles.container}>
        <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
          <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center", flex: 1 }}>
          <Text style={styles.title}>Starts</Text>
          <Text style={styles.date}>Wed, 12 August 2020</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 62,
    marginVertical: 10,
    flexDirection: "row",
  },
  title: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  date: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    color: colors.textSecondary,
  },
});

export default DateInput;
