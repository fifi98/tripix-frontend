import React, { useState, useContext } from "react";
import { Alert, StyleSheet, SafeAreaView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import BoldText from "../../components/ui/BoldText";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import api from "../../utils/api";
import Caption from "../../components/ui/Caption";
import InputField from "../../components/ui/InputField";
import BackButton from "../../components/ui/BackButton";
import Title from "../../components/ui/Title";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";
import validate from "../../utils/inputValidation";

const Password = ({ navigation }) => {
  const { user } = useContext(MyContext);
  const [input, setInput] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [inputError, setInputError] = useState({ current_password: false, new_password: false });
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = () => {
    // Check if passwords are entered
    if (input.current_password.length === 0 && input.new_password.length === 0 && input.confirm_password.length === 0) {
      return setInputError({ current_password: true, new_password: true });
    }

    // Validate current password format
    if (!validate.password(input.current_password)) return setInputError((old) => ({ ...old, current_password: true }));
    // Validate new password and confirm password format
    if (!validate.password(input.new_password, input.confirm_password)) return setInputError((old) => ({ ...old, new_password: true }));

    setLoading(true);
    api
      .post("/user/change-password", { current_password: input.current_password, new_password: input.new_password })
      .then((response) => {
        // Save the new token in the state and AsyncStorage
        user.changePassword(response.data.token);
        setInput({ current_password: "", new_password: "", confirm_password: "" });
        Alert.alert("Password successfully changed!");
      })
      .catch(() => {
        setInputError((old) => ({ ...old, current_password: true }));
        Alert.alert("Incorrect current password!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screen}>
        <ScrollView style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />
          <Title>
            <BoldText>Password</BoldText>
          </Title>

          <Caption>Here you can change your account password.</Caption>
          <InputField
            isPassword={true}
            placeholder="Current password"
            icon={faKey}
            value={input.current_password}
            onChangeText={(text) => {
              setInput({ ...input, current_password: text });
              setInputError((old) => ({ ...old, current_password: false }));
            }}
            error={inputError.current_password}
          />
          <InputField
            isPassword={true}
            placeholder="New password"
            icon={faKey}
            value={input.new_password}
            onChangeText={(text) => {
              setInput({ ...input, new_password: text });
              setInputError((old) => ({ ...old, new_password: false }));
            }}
            error={inputError.new_password}
          />
          <InputField
            isPassword={true}
            placeholder="Confirm new password"
            icon={faKey}
            value={input.confirm_password}
            onChangeText={(text) => {
              setInput({ ...input, confirm_password: text });
              setInputError((old) => ({ ...old, new_password: false }));
            }}
            error={inputError.new_password}
          />
          <ButtonPrimary title="Change Password" onPress={handleChangeEmail} loading={loading} />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "88%",
    paddingTop: 10,
    height: "100%",
  },
});

export default Password;
