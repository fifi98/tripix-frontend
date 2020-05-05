import React, { useContext, useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import BoldText from "../../components/ui/BoldText";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import LoginSubtitle from "../../components/LoginSubtitle";
import InputField from "../../components/ui/InputField";
import { HeaderBackButton } from "@react-navigation/stack";

const Account = ({ navigation }) => {
  const { user } = useContext(MyContext);
  const [input, setInput] = useState({ email: "" });

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <View style={{ marginLeft: -10 }}>
          <HeaderBackButton onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.title}>
          <BoldText>Account Settings</BoldText>
        </Text>
        <LoginSubtitle text="Change email address" />
        <InputField
          placeholder="Email"
          icon={faEnvelope}
          value={input.email}
          onChangeText={(text) => {
            setInput({ ...input, email: text });
            // setInputError(false);
          }}
          // error={inputError}
        />
        <ButtonPrimary title="Change Email" />
        <Button title="Change Email" />

        <LoginSubtitle text="Password" />
        <InputField
          placeholder="Enter a new password"
          icon={faEnvelope}
          value={input.email}
          onChangeText={(text) => {
            setInput({ ...input, email: text });
            // setInputError(false);
          }}
          // error={inputError}
        />
        <InputField
          placeholder="Repeat password"
          icon={faEnvelope}
          value={input.email}
          onChangeText={(text) => {
            setInput({ ...input, email: text });
            // setInputError(false);
          }}
          // error={inputError}
        />
        <ButtonPrimary title="Save" />
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
