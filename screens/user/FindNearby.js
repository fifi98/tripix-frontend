import React, { useEffect, useContext, useState, useRef } from "react";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { MyContext } from "../../context/Provider";
import RoundButton from "../../components/RoundButton";
import { faChevronCircleLeft, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../constants/mapStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Sheet from "../../components/Sheet";
import NearbyItem from "../../components/NearbyItem";

const FindNearby = ({ route, navigation }) => {
  const { user } = useContext(MyContext);
  const [userPosition, setUserPosition] = useState();
  const [places, setPlaces] = useState([]);
  const sheet = useRef(null);

  const placeType = route.params.type;

  const data = [
    {
      place_id: "",
      latitude: "",
      longitude: "",
      photo_reference: "",
      rating: "",
      name: "",
    },
  ];

  const fetchData = (position) => {
    let initialPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    };
    console.log(user.token);
    setUserPosition(initialPosition);
    api
      .get("/nearby/" + placeType, {
        params: { long: position.coords.longitude, lat: position.coords.latitude },
      })
      .then((response) => {
        setPlaces(response.data);
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => fetchData(position), (error) => Alert.alert(error.message));
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShowAll = () => {
    sheet.current.snapTo(0);
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "gray",
          borderBottomWidth: 0.5,
          paddingBottom: 6,
        }}
      >
        <Text style={{ fontSize: 16, color: colors.textSecondary }}>Nearby restaurants</Text>
        <TouchableOpacity onPress={handleShowAll}>
          <Text style={{ color: "#007AFF", fontSize: 16 }}>See All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={userPosition}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        {places.map((place) => (
          <Marker key={place.place_id} tracksViewChanges={false} coordinate={{ latitude: place.latitude, longitude: place.longitude }}>
            <View style={{ backgroundColor: "#30D158", padding: 6, borderRadius: 20 }}>
              <FontAwesomeIcon icon={faCoffee} size={18} style={{ color: "white" }} />
            </View>
          </Marker>
        ))}
      </MapView>
      <Sheet title="Nearby" buttonText="Start route">
        <ScrollView>
          {places.map((place) => (
            <NearbyItem item={place} />
          ))}
        </ScrollView>
      </Sheet>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesomeIcon icon={faChevronCircleLeft} style={styles.icon} size={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    left: 22,
    top: 34,
  },
  icon: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    paddingHorizontal: 20,
    backgroundColor: "#313233",
  },
  header: {
    backgroundColor: "#313233",
    shadowColor: "#000000",
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

export default FindNearby;
