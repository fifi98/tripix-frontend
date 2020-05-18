import React, { useContext, useState } from "react";
import { StyleSheet, SafeAreaView, Alert, ScrollView } from "react-native";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import BoldText from "../../components/ui/BoldText";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import api from "../../utils/api";
import Caption from "../../components/ui/Caption";
import InputField from "../../components/ui/InputField";
import BackButton from "../../components/ui/BackButton";
import Title from "../../components/ui/Title";
import validate from "../../utils/inputValidation";

const Account = ({ navigation }) => {
  const { user } = useContext(MyContext);
  const [email, setEmail] = useState(user.email);
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = () => {
    // Check if email is in valid format
    if (!validate.email(email)) return setInputError(true);

    setLoading(true);
    api
      .post("/user/change-email", { email: email })
      .then((response) => {
        // Change token and email
        user.saveToken(response.data.token, user.user_id, user.name, email);
        Alert.alert("Email successfully changed!");
      })
      .catch(() => Alert.alert("An error has occured, please try again later!"))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Title>
          <BoldText>Email address</BoldText>
        </Title>

        <Caption>In order to change your account email address, type in a new one and click the button to proceed.</Caption>
        <InputField
          placeholder="Email"
          icon={faEnvelope}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setInputError(false);
          }}
          error={inputError}
        />
        <ButtonPrimary title="Change Email" onPress={handleChangeEmail} loading={loading} />
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
});

export default Account;
