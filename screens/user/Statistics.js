import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { colors } from "../../constants/theme";
import BoldText from "../../components/ui/BoldText";
import api from "../../utils/api";
import BackButton from "../../components/ui/BackButton";
import Title from "../../components/ui/Title";

const Profile = ({ navigation }) => {
  const [userStats, setUserStats] = useState({
    finishedRoutesCount: 0,
    plannedRoutesCount: 0,
    placesVisited: 0,
    totalDistanceTravelled: 0,
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
        <BackButton onPress={() => navigation.goBack()} />
        <Title>
          <BoldText>Statistics</BoldText>
        </Title>
        <View style={styles.statsContainer}>
          {statItems.map((item, index) => (
            <View key={index} style={styles.statItemContainer}>
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
  statsCount: {
    fontSize: 36,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statsName: {
    color: colors.textSecondary,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  statItemContainer: {
    width: "50%",
  },
});

export default Profile;
