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

const Profile = () => {
  const [userStats, setUserStats] = useState({
    finishedRoutesCount: 3,
    plannedRoutesCount: 22,
    placesVisited: 2,
    totalDistanceTravelled: 130.3,
  });

  useEffect(() => {
    api.get("/user/stats").then((response) => setUserStats(response.data));
  }, []);

  const statItems = [
    { title: "Finished routes", name: "finishedRoutesCount" },
    { title: "Planned routes", name: "plannedRoutesCount" },
    { title: "Places visited", name: "placesVisited" },
    { title: "Total distance traveled", name: "totalDistanceTravelled" },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          <BoldText>Your profile</BoldText>
        </Text>

        <LoginSubtitle text="Statistics" />

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {statItems.map((item, index) => (
            <View key={index} style={{ width: "50%" }}>
              <Text style={styles.statsCount}>{userStats[item.name]}</Text>
              <Text style={styles.statsName}>{item.title}</Text>
            </View>
          ))}
        </View>
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

export default Profile;
