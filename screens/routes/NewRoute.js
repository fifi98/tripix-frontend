import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import { colors } from "../../constants/theme";
import InputField from "../../components/InputField";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import { MyContext } from "../../context/Provider";

const NewRoute = () => {
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
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Where are you going?</Text>
        <InputField placeholder="e.g. London" icon={faMapMarkerAlt} />
        <InputField placeholder="e.g. London" icon={faMapMarkerAlt} />
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: "14%",
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  container: {
    width: "85%"
  },
  title: {
    fontSize: 22,
    color: "white",
    marginBottom: 10
  }
});
export default NewRoute;
