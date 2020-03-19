import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { MyContext } from "../context/Provider";

const Profile = () => {
  const handleLogout = removeToken => {
    removeToken();
    console.log("Logout");
  };

  return (
    <View style={styles.container}>
      <MyContext.Consumer>
        {context => <Button title="Logout" onPress={() => handleLogout(context.removeToken)} />}
      </MyContext.Consumer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;
