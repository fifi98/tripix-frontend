import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const InputField = ({ icon, placeholder, value, onChangeText, isPassword, numbers }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
        <FontAwesomeIcon icon={icon} style={styles.icon} />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
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
  field: {
    color: colors.textPrimary,
    width: "100%",
    flex: 1,
    fontSize: 16,
  },
  icon: {
    color: colors.textSecondary,
  },
});

export default InputField;
