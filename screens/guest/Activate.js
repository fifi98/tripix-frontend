import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ButtonPrimary";
import LoginTitle from "../../components/LoginTitle";
import LoginSubtitle from "../../components/LoginSubtitle";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Activate = ({ route }) => {
  const [input, setInput] = useState({ email: route.params.email, activation_code: "" });

  console.log(input);

  const handleActivate = () => {
    api
      .post("/users/verify", input)
      .then((response) => console.log())
      .catch((error) => console.log(error.response.data));
    Alert.alert("awfawf");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <LoginTitle text="Check your inbox!" />
          <LoginSubtitle text="Type in the 6 digit activation code you received in your email." />

          <InputField
            placeholder="Activation code"
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => setInput({ ...input, activation_code: text })}
            numbers
          />

          <ButtonPrimary title="Activate account" onPress={handleActivate} />
        </View>
        <View style={styles.footer}>{/* <ButtonSecondary title="Already have an account?" onPress={toLogin} /> */}</View>
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

export default Activate;
