import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import InputField from "../../components/ui/InputField";
import BackButton from "../../components/ui/BackButton";
import TitleSmall from "../../components/ui/TitleSmall";
import BoldText from "../../components/ui/BoldText";
import Caption from "../../components/ui/Caption";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ForgottenPassword = ({ route, navigation }) => {
  const [input, setInput] = useState({ email: route.params.email });
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleActivate = () => {
    // Check if email is in valid format
    if (!/\S+@\S+\.\S+/.test(input.email)) return setInputError(true);

    setLoading(true);
    api
      .post("/users/forgottenPassword", input)
      .then(() => navigation.navigate("ResetPassword", { email: input.email }))
      .catch((error) => Alert.alert(error.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />
          <TitleSmall>
            <BoldText>Forgotten</BoldText> password?
          </TitleSmall>
          <Caption>Type in your account's email address below and we will send you a password reset link.</Caption>

          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={(text) => {
              setInput({ ...input, email: text });
              setInputError(false);
            }}
            error={inputError}
          />

          <ButtonPrimary title="Send reset link" onPress={handleActivate} loading={loading} />
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
  container: {
    width: "88%",
  },
});

export default ForgottenPassword;
