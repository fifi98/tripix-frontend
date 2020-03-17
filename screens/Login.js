import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import api from "../utils/api";

const Login = ({ navigation }) => {
  const [input, setInput] = useState({ email: "", password: "" });

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    //Insert authentication logic here

    console.log(input);
    api
      .post("/login", input)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.login}>
        <View style={styles.container}>
          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={text => setInput({ ...input, email: text })}
          />
          <InputField
            placeholder="Password"
            icon={faKey}
            isPassword={true}
            value={input.password}
            onChangeText={text => setInput({ ...input, password: text })}
          />
          <ButtonPrimary title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.footer}>
          <ButtonSecondary title="Forgot password?" />
          <ButtonSecondary title="Sign up here!" onPress={handleRegister} />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
