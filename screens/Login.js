import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <View style={styles.login}>
      <View style={styles.container}>
        <InputField placeholder="Email" icon={faEnvelope} />
        <InputField placeholder="Password" icon={faKey} />
        <ButtonPrimary title="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    paddingTop: "20%",
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  container: {
    width: "85%"
  }
});

export default Login;
