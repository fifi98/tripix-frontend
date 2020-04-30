import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Moment from "moment";
import { MyContext } from "../context/Provider";

const DateInput = ({ onPress }) => {
  const { newRoute } = React.useContext(MyContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={{ width: 50, alignItems: "center", justifyContent: "center" }}>
          <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
        </View>
        <View style={{ alignItems: "flex-start", justifyContent: "center", flex: 1 }}>
          <Text style={styles.title}>Starts</Text>
          <Text style={styles.date}>{Moment(newRoute.date).format("ddd, D MMMM YYYY")}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    height: 62,
    marginVertical: 10,
    flexDirection: "row",
  },
  title: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  date: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    color: colors.textSecondary,
  },
});

export default DateInput;
