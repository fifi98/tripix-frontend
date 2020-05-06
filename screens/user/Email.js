import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from "react-native";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import BoldText from "../../components/ui/BoldText";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import api from "../../utils/api";
import Caption from "../../components/ui/Caption";
import InputField from "../../components/ui/InputField";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { HeaderBackButton } from "@react-navigation/stack";

const Account = ({ navigation }) => {
  const { user, setUser } = useContext(MyContext);
  const [email, setEmail] = useState(user.email);

  const handleChangeEmail = () => {
    api
      .post("/users/loggedNewEmail", { email: email })
      .then((response) => {
        // Change token and email
        user.saveToken(response.data.token, user.user_id, user.name, email);

        console.log(email);

        Alert.alert("Email successfully changed!");
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={{ marginLeft: -10 }}>
          <HeaderBackButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.title}>
          <BoldText>Email address</BoldText>
        </Text>
        <Caption>Change email address</Caption>
        <InputField
          placeholder="Email"
          icon={faEnvelope}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            // setInputError(false);
          }}
          // error={inputError}
        />
        <ButtonPrimary title="Change Email" onPress={handleChangeEmail} />
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

export default Account;
