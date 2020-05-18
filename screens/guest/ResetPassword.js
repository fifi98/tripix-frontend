import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/ui/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import TitleSmall from "../../components/ui/TitleSmall";
import Caption from "../../components/ui/Caption";
import BoldText from "../../components/ui/BoldText";
import api from "../../utils/api";

const ResetPassword = ({ route, navigation }) => {
  const [input, setInput] = useState({ email: route.params.email, reset_code: "" });
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleActivate = () => {
    // Validate input
    if (input.reset_code.length !== 6) {
      Alert.alert("Please enter the 6 digit code you received on email!");
      setInputError(true);
      return;
    }
    // Send request
    setLoading(true);
    api
      .post("/user/password/code", input)
      .then(() => navigation.navigate("NewPassword", { email: input.email, reset_code: input.reset_code }))
      .catch((error) => Alert.alert(error.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <TitleSmall>
            <BoldText>Check your inbox!</BoldText>
          </TitleSmall>
          <Caption>Type in the password reset code we sent to your email.</Caption>

          <InputField
            placeholder="Password reset code"
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => {
              setInput({ ...input, reset_code: text });
              setInputError(true);
            }}
            error={inputError}
            numbers
          />

          <ButtonPrimary title="Reset password" onPress={handleActivate} loading={loading} />
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
    width: "88%",
  },
});

export default ResetPassword;
