import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, SafeAreaView } from "react-native";
import InputField from "../../components/ui/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";
import Title from "../../components/ui/Title";
import Caption from "../../components/ui/Caption";
import api from "../../utils/api";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";

const Login = ({ navigation }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [inputError, setInputError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { user } = useContext(MyContext);

  const handleLogin = async () => {
    setButtonLoading(true);
    api
      .post("/login", input)
      .then(({ data }) => {
        // Store JTW in the context and go to the main screen
        user.saveToken(data.token, data.user_id, data.full_name, input.email);
      })
      .catch(() => {
        Alert.alert("Incorrect credentials!");
        setInputError(true);
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Title>Welcome!</Title>
            <Caption>Sign in to continue</Caption>
          </View>
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
          <InputField
            placeholder="Password"
            icon={faKey}
            isPassword={true}
            value={input.password}
            onChangeText={(text) => {
              setInput({ ...input, password: text });
              setInputError(false);
            }}
            error={inputError}
          />

          <ButtonPrimary title="Login" onPress={handleLogin} loading={buttonLoading} />
        </View>
        <View style={styles.footer}>
          <ButtonSecondary title="Forgot password?" onPress={() => navigation.navigate("ForgottenPassword", { email: input.email })} />
          <ButtonSecondary title="Sign up here!" onPress={() => navigation.navigate("Register")} />
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

export default Login;
