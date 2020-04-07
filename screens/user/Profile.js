import React, { useContext } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { MyContext } from "../../context/Provider";

const Profile = () => {
  const { user } = React.useContext(MyContext);

  const handleLogout = () => {
    user.removeToken();
    console.log("a");
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
