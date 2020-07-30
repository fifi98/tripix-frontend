import React, { useContext } from "react";
import Moment from "moment";
import { StyleSheet, View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../context/Provider";
import { colors } from "../../constants/theme";

const DateInput = ({ onPress }) => {
  const { newRoute } = useContext(MyContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faCalendarAlt} style={styles.icon} />
        </View>
        <View style={styles.valueContainer}>
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
  iconContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: colors.textSecondary,
  },
  valueContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
});

export default DateInput;
