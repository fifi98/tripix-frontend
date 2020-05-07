import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/ui/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import TitleSmall from "../../components/ui/TitleSmall";
import Caption from "../../components/ui/Caption";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = ({ route, navigation }) => {
  const [input, setInput] = useState({ email: route.params.email, reset_code: "" });

  const handleActivate = () => {
    api
      .post("/user/password/code", input)
      .then(() => navigation.navigate("NewPassword", { email: input.email, reset_code: input.reset_code }))
      .catch((error) => Alert.alert(error.response.data.message));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <TitleSmall>Check your inbox!</TitleSmall>
          <Caption>Type in the password reset code we sent to your email.</Caption>

          <InputField
            placeholder="Password reset code"
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => setInput({ ...input, reset_code: text })}
            numbers
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

export default ResetPassword;
