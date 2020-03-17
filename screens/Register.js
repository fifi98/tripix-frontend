import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { faEnvelope, faKey, faUser, faMedal } from "@fortawesome/free-solid-svg-icons";
import api from "../utils/api";

const Register = ({ navigation }) => {
  const [input, setInput] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const toLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    console.log(input);
    api
      .post("/users", input)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.login}>
        <View style={styles.container}>
          <InputField
            placeholder="Full name"
            icon={faUser}
            value={input.fullName}
            onChangeText={text => setInput({ ...input, name: text })}
          />
          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={text => setInput({ ...input, email: text })}
          />
          <InputField
            placeholder="Password"
            icon={faKey}
            value={input.password}
            onChangeText={text => setInput({ ...input, password: text })}
            isPassword={true}
          />
          <InputField
            placeholder="Confirm password"
            icon={faKey}
            value={input.confirmPassword}
            onChangeText={text => setInput({ ...input, confirmPassword: text })}
            isPassword={true}
          />
          <ButtonPrimary title="Sign up" onPress={handleRegister} />
        </View>
        <View style={styles.footer}>
          <ButtonSecondary title="Already have an account?" onPress={toLogin} />
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

export default Register;
