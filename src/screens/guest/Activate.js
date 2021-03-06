import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/ui/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import BoldText from "../../components/ui/BoldText";
import Caption from "../../components/ui/Caption";
import Title from "../../components/ui/Title";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";

const Activate = ({ route }) => {
  const [input, setInput] = useState({ email: route.params.email, activation_code: "" });
  const [buttonLoading, setButtonLoading] = useState(false);
  const { user } = useContext(MyContext);

  const handleActivate = () => {
    setButtonLoading(true);
    api
      .post("/user/verify", input)
      .then((response) => {
        //Store JTW in the context and go to the main screen
        user.saveToken(response.data.token, response.data.user_id, response.data.full_name, input.email);
      })
      .catch(() => Alert.alert("Invalid activation code!"))
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <Title>
            <BoldText>Check your inbox!</BoldText>
          </Title>
          <Caption>Type in the 6 digit activation code you received in your email.</Caption>

          <InputField
            placeholder="Activation code"
            icon={faKey}
            value={input.activation_code}
            onChangeText={(text) => setInput({ ...input, activation_code: text })}
            numbers
          />

          <ButtonPrimary title="Activate account" onPress={handleActivate} loading={buttonLoading} />
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

export default Activate;
