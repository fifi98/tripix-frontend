import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import LoginTitle from "../../components/LoginTitle";
import LoginSubtitle from "../../components/LoginSubtitle";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

const Register = ({ navigation }) => {
  const [input, setInput] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const toLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    api
      .post("/users", input)
      .then((response) => navigation.navigate("Activate", { email: input.email }))
      .catch((error) => {
        const message = error.response.data;
        if (message.email) {
          console.log("Email in use");
        }
        console.log(message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <LoginTitle text="Create an account" />
          <LoginSubtitle text="Type in your information" />

          <InputField
            placeholder="Full name"
            icon={faUser}
            value={input.name}
            onChangeText={(text) => setInput({ ...input, name: text })}
          />
          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={(text) => setInput({ ...input, email: text })}
          />
          <InputField
            placeholder="Password"
            icon={faKey}
            value={input.password}
            onChangeText={(text) => setInput({ ...input, password: text })}
            isPassword={true}
          />
          <InputField
            placeholder="Confirm password"
            icon={faKey}
            value={input.confirmPassword}
            onChangeText={(text) => setInput({ ...input, confirmPassword: text })}
            isPassword={true}
          />
          <ButtonPrimary title="Sign up" onPress={handleRegister} />
        </View>
        <View style={styles.footer}>
          <ButtonSecondary title="Already have an account?" onPress={toLogin} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    paddingTop: 30,
    width: "85%",
  },
});

export default Register;
