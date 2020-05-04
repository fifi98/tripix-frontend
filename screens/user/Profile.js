import React, { useContext } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";
import BoldText from "../../components/ui/BoldText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartBar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useContext(MyContext);

  const handleLogout = () => {
    user.removeToken();
    console.log("a");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Your profile</BoldText>
        </Text>

        <View style={{ marginVertical: 10, marginHorizontal: 4 }}>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ marginVertical: 10, flexDirection: "row", alignItems: "center" }}>
                <FontAwesomeIcon icon={faChartBar} style={{ color: "white", marginRight: 10 }} />
                <Text style={{ color: "white", fontSize: 18 }}>Statistics</Text>
              </View>
              <FontAwesomeIcon icon={faChevronRight} style={{ color: "white", marginRight: 10 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ marginVertical: 10, flexDirection: "row", alignItems: "center" }}>
                <FontAwesomeIcon icon={faUser} style={{ color: "white", marginRight: 10 }} />
                <Text style={{ color: "white", fontSize: 18 }}>Account settings</Text>
              </View>
              <FontAwesomeIcon icon={faChevronRight} style={{ color: "white", marginRight: 10 }} />
            </View>
          </TouchableOpacity>
        </View>

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
    paddingTop: 10,
    height: "100%",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
});

export default Profile;
