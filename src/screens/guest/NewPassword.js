import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import InputField from "../../components/ui/InputField";
import TitleSmall from "../../components/ui/TitleSmall";
import BoldText from "../../components/ui/BoldText";
import Caption from "../../components/ui/Caption";
import api from "../../utils/api";
import validate from "../../utils/inputValidation";

const NewPassword = ({ route, navigation }) => {
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: route.params.email,
    reset_code: route.params.reset_code,
    new_password: "",
    new_password_confirm: "",
  });

  const handleActivate = () => {
    // Validate input
    if (!validate.password(input.new_password, input.new_password_confirm)) return setInputError(true);

    // Send request
    setLoading(true);
    api
      .post("/user/password/new", input)
      .then(() => navigation.navigate("Login"))
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
          <Caption>Type in the your new password.</Caption>

          <InputField
            placeholder="New password"
            isPassword={true}
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => {
              setInput({ ...input, new_password: text });
              setInputError(false);
            }}
            error={inputError}
          />
          <InputField
            placeholder="Confirm new password"
            isPassword={true}
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => {
              setInput({ ...input, new_password_confirm: text });
              setInputError(false);
            }}
            error={inputError}
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
    width: "85%",
  },
});

export default NewPassword;
