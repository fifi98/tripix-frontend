import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ButtonPrimary";
import TitleSmall from "../../components/TitleSmall";
import LoginSubtitle from "../../components/LoginSubtitle";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const NewPassword = ({ route, navigation }) => {
  const [input, setInput] = useState({
    email: route.params.email,
    reset_code: route.params.reset_code,
    new_password: "",
    new_password_confirm: "",
  });

  const handleActivate = () => {
    api
      .post("/users/newPassword", input)
      .then((response) => navigation.navigate("Login"))
      .catch((error) => Alert.alert(error.response.data.message));
  };

  console.log(input);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <TitleSmall text="Check your inbox!" />
          <LoginSubtitle text="Type in the password reset code we sent to your email." />

          <InputField
            placeholder="Password reset code"
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => setInput({ ...input, new_password: text })}
          />
          <InputField
            placeholder="Password reset code"
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => setInput({ ...input, new_password_confirm: text })}
          />

          <ButtonPrimary title="Reset password" onPress={handleActivate} />
        </View>
        <View style={styles.footer} />
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

export default NewPassword;
