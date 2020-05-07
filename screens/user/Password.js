import React, { useContext, useState } from "react";
import { Alert, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BoldText from "../../components/ui/BoldText";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import api from "../../utils/api";
import Caption from "../../components/ui/Caption";
import InputField from "../../components/ui/InputField";
import BackButton from "../../components/ui/BackButton";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Password = ({ navigation }) => {
  const { setUser } = useContext(MyContext);
  const [input, setInput] = useState({ current_password: "", new_password: "", confirm_password: "" });

  const handleChangeEmail = () => {
    api
      .post("/users/loggedNewPassword", { current_password: input.current_password, new_password: input.new_password })
      .then((response) => {
        // Change token l
        setUser((user) => ({ ...user, token: response.data.token }));

        // SPREMI TOKENA U ASYNC STORAGE
        Alert.alert("Password successfully changed!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>
          <BoldText>Password</BoldText>
        </Text>

        <Caption>Change your password</Caption>
        <InputField
          isPassword={true}
          placeholder="Current password"
          icon={faKey}
          value={input.current_password}
          onChangeText={(text) => {
            setInput({ ...input, current_password: text });
            // setInputError(false);
          }}
          // error={inputError}
        />
        <InputField
          isPassword={true}
          placeholder="New password"
          icon={faKey}
          value={input.new_password}
          onChangeText={(text) => {
            setInput({ ...input, new_password: text });
            // setInputError(false);
          }}
          // error={inputError}
        />
        <InputField
          isPassword={true}
          placeholder="Confirm new password"
          icon={faKey}
          value={input.confirm_password}
          onChangeText={(text) => {
            setInput({ ...input, confirm_password: text });
            // setInputError(false);
          }}
          // error={inputError}
        />
        <ButtonPrimary title="Change Password" onPress={handleChangeEmail} />
      </ScrollView>
    </SafeAreaView>
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
  title: {
    fontSize: 30,
    color: "white",
  },
  statsCount: {
    fontSize: 36,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statsName: {
    color: colors.textSecondary,
    marginBottom: 10,
  },
});

export default Password;