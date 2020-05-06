import React, { useContext } from "react";
import { View, Button, StyleSheet, SafeAreaView } from "react-native";
import MenuButton from "../../components/settings/MenuButton";
import BoldText from "../../components/ui/BoldText";
import { faChartBar, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Title from "../../components/ui/Title";

const Profile = ({ navigation }) => {
  const { user } = useContext(MyContext);

  const handleLogout = () => {
    user.removeToken();
  };

  const menuButtons = [
    { title: "Statistics", icon: faChartBar, onPress: () => navigation.navigate("Statistics") },
    { title: "Email", icon: faEnvelope, onPress: () => navigation.navigate("Email") },
    { title: "Password", icon: faKey, onPress: () => navigation.navigate("Password") },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Title>
          <BoldText>Your profile</BoldText>
        </Title>
        <View style={styles.menuContainer}>
          {menuButtons.map((button) => (
            <MenuButton key={button.title} button={button} />
          ))}
        </View>
        <View style={styles.logoutContainer}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
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
  menuContainer: {
    marginVertical: 10,
    marginHorizontal: 4,
  },
  logoutContainer: {
    marginTop: 20,
  },
});

export default Profile;
