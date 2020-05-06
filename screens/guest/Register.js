import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/ui/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";
import Title from "../../components/ui/Title";
import Caption from "../../components/ui/Caption";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

const Register = ({ navigation }) => {
  const [input, setInput] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [inputError, setInputError] = useState({ name: false, email: false, password: false });
  const [buttonLoading, setButtonLoading] = useState(false);

  const toLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    Keyboard.dismiss();

    // Check confirm password input
    if (input.password !== input.confirmPassword) {
      setInputError((old) => ({ ...old, password: true }));
      return Alert.alert("Password and confirm password fields do not match!");
    }

    setButtonLoading(true);

    // Send register post request to the server
    api
      .post("/users", input)
      .then(() => navigation.navigate("Activate", { email: input.email }))
      .catch((error) => {
        const message = error.response.data;

        // Check which input is invalid and change input field style accordingly
        message.name != undefined && setInputError((old) => ({ ...old, name: true }));
        message.email != undefined && setInputError((old) => ({ ...old, email: true }));
        message.password != undefined && setInputError((old) => ({ ...old, password: true }));

        // Show the first error contained in the response
        Alert.alert(message[Object.keys(message)[0]][0]);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <Title text="Create an account" />
          <Caption>Type in your information</Caption>

          <InputField
            placeholder="Full name"
            icon={faUser}
            value={input.name}
            onChangeText={(text) => {
              setInput({ ...input, name: text });
              setInputError((old) => ({ ...old, name: false }));
            }}
            error={inputError.name}
          />
          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={(text) => {
              setInput({ ...input, email: text });
              setInputError((old) => ({ ...old, email: false }));
            }}
            error={inputError.email}
          />
          <InputField
            placeholder="Password"
            icon={faKey}
            value={input.password}
            onChangeText={(text) => {
              setInput({ ...input, password: text });
              setInputError((old) => ({ ...old, password: false }));
            }}
            isPassword={true}
            error={inputError.password}
          />
          <InputField
            placeholder="Confirm password"
            icon={faKey}
            value={input.confirmPassword}
            onChangeText={(text) => {
              setInput({ ...input, confirmPassword: text });
              setInputError((old) => ({ ...old, password: false }));
            }}
            isPassword={true}
            error={inputError.password}
          />
          <ButtonPrimary title="Sign up" onPress={handleRegister} loading={buttonLoading} />
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
    width: "88%",
  },
});

export default Register;
