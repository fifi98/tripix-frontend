import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const Login = ({ navigation }) => {
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    //Insert authentication logic here

    navigation.navigate("Home");
  };

  return (
    <View style={styles.login}>
      <View style={styles.container}>
        <InputField placeholder="Email" icon={faEnvelope} />
        <InputField placeholder="Password" icon={faKey} />
        <ButtonPrimary title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.footer}>
        <ButtonSecondary title="Forgot password?" />
        <ButtonSecondary title="Sign up here!" onPress={handleRegister} />
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

export default Login;
