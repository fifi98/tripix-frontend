import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import LoginTitle from "../../components/LoginTitle";
import LoginSubtitle from "../../components/LoginSubtitle";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";

const Activate = ({ route }) => {
  const [input, setInput] = useState({ email: route.params.email, activation_code: "" });
  const { user } = useContext(MyContext);

  const handleActivate = () => {
    api
      .post("/users/verify", input)
      .then((response) => {
        //Store JTW in the context and go to the main screen
        user.saveToken(response.data.token, response.data.user_id);
      })
      .catch((error) => Alert.alert(error.response.data.message));
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
