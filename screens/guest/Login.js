import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, SafeAreaView } from "react-native";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";
import LoginTitle from "../../components/LoginTitle";
import LoginSubtitle from "../../components/LoginSubtitle";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";

const Login = ({ navigation }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [inputError, setInputError] = useState(false);
  const { user } = React.useContext(MyContext);

  const handleLogin = async () => {
    api
      .post("/login", input)
      .then(({ data }) => {
        // Store JTW in the context and go to the main screen
        user.saveToken(data.token, data.user_id, data.full_name);
      })
      .catch((err) => {
        if (err.response.data.message) Alert.alert(err.response.data.message);
        else Alert.alert(err.response.data[Object.keys(err.response.data)[0]][0]);
        setInputError(true);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <View style={styles.title}>
            <LoginTitle text="Welcome!" />
            <LoginSubtitle text="Sign in to continue" />
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

          <ButtonPrimary title="Login" onPress={handleLogin} />
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
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 17,
    marginVertical: 20,
  },
});

export default Login;
