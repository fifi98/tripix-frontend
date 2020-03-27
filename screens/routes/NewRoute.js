import React from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";

import { colors } from "../../constants/theme";
import InputField from "../../components/InputField";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import { MyContext } from "../../context/Provider";
import LoginSubtitle from "../../components/LoginSubtitle";
import { TouchableOpacity } from "react-native-gesture-handler";

const NewRoute = props => {
  const user = React.useContext(MyContext);

  const handleNext = () => {
    api
      .get("/users", {
        headers: {
          Authorization: "Bearer " + user.token
        }
      })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
    props.navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Where are you going?</Text>
        <InputField placeholder="e.g. London" icon={faMapMarkerAlt} />
        <InputField placeholder="e.g. London" icon={faMapMarkerAlt} />
        <LoginSubtitle text="Nearby locations" />
        <TouchableOpacity>
          <View style={styles.card}></View>
        </TouchableOpacity>
        <Button title="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  container: {
    width: "85%",
    paddingTop: 30
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10
  },
  card: {
    height: 170,
    backgroundColor: "white",
    borderRadius: 10
  }
});
export default NewRoute;
