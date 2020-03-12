import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <InputField placeholder="Email" />
      <Text> </Text>
      <InputField placeholder="Password" />
      <ButtonPrimary title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  }
});

export default Login;
