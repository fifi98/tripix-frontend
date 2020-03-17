import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { faEnvelope, faKey, faUser, faMedal } from "@fortawesome/free-solid-svg-icons";

const Register = ({ navigation }) => {
  const toLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.login}>
      <View style={styles.container}>
        <InputField placeholder="Full name" icon={faUser} />
        <InputField placeholder="Email" icon={faEnvelope} />
        <InputField placeholder="Password" icon={faKey} />
        <InputField placeholder="Confirm password" icon={faKey} />
        <ButtonPrimary title="Sign up" />
      </View>
      <View style={styles.footer}>
        <ButtonSecondary title="Already have an account?" onPress={toLogin} />
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    width: "85%"
  }
});

export default Register;
