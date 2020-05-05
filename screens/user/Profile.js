import React, { useContext, useEffect } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import BoldText from "../../components/ui/BoldText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartBar, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MenuButton from "../../components/settings/MenuButton";

const Profile = ({ navigation }) => {
  const { user } = useContext(MyContext);

  const handleLogout = () => {
    user.removeToken();
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const menuButtons = [
    { title: "Statistics", icon: faChartBar, onPress: () => navigation.navigate("Statistics") },
    { title: "Email", icon: faEnvelope, onPress: () => navigation.navigate("Email") },
    { title: "Password", icon: faKey, onPress: () => navigation.navigate("Password") },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Your profile</BoldText>
        </Text>

        <View style={{ marginVertical: 10, marginHorizontal: 4 }}>
          {menuButtons.map((button) => (
            <MenuButton key={button.title} button={button} />
          ))}
        </View>
        <View style={styles.logoutContainer} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
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
    paddingTop: 25,
    height: "100%",
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  logoutContainer: {
    marginTop: 20,
  },
});

export default Profile;
