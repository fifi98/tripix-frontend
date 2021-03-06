import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../constants/theme";

const InputField = ({ icon, placeholder, value, onChangeText, isPassword, numbers, error }) => {
  return (
    <View style={[styles.container, error && styles.error]}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} style={styles.icon} />
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.field}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          keyboardType={numbers ? "number-pad" : "default"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 36,
    marginVertical: 10,
    flexDirection: "row",
  },
  error: {
    borderColor: "#E20000",
    borderWidth: 1,
  },
  fieldContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  field: {
    color: colors.textPrimary,
    width: "100%",
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  iconContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: colors.textSecondary,
  },
});

export default InputField;
