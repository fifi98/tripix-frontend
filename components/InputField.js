import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

const InputField = ({ placeholder }) => {
  return <TextInput style={styles.field} placeholder={placeholder} placeholderTextColor={colors.textGray} />;
};

const styles = StyleSheet.create({
  field: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 36
  }
});

export default InputField;
