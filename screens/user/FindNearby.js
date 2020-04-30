import React, { useEffect, useState, createRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import api from "../../utils/api";
import Sheet from "../../components/Sheet";
import NearbyItem from "../../components/NearbyItem";
import { View, Alert, StyleSheet, TouchableOpacity, ScrollView, InteractionManager, Text } from "react-native";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { mapStyle } from "../../constants/mapStyle";
import { colors } from "../../constants/theme";
import Loading from "../../components/Loading";

const FindNearby = ({ route, navigation }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, icon, color } = route.params;
  let mapRef = createRef();

  // Load nearby places when the screen is loaded
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          api
            .get(`/nearby/${type}`, {
              params: { long: position.coords.longitude, lat: position.coords.latitude },
            })
            .then((response) => {
              setPlaces(response.data);
              setLoading(false);
            });
        },
        (error) => Alert.alert(error.message)
      );
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
          <Loading text="Loading places" />
        </View>
      ) : (
        <>
          <MapView
            ref={(ref) => (mapRef = ref)}
            onMapReady={() => {
              mapRef.fitToCoordinates(places, {
                edgePadding: { top: 0, right: 50, bottom: 200, left: 50 },
                animated: true,
              });
            }}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
          >
            {places.map((place) => (
              <Marker key={place.place_id} tracksViewChanges={false} coordinate={{ latitude: place.latitude, longitude: place.longitude }}>
                <View style={{ ...styles.markerContainer, backgroundColor: color }}>
                  <FontAwesomeIcon icon={icon} size={18} style={styles.icon} />
                </View>
              </Marker>
            ))}
          </MapView>
          <Sheet title="Nearby" buttonText="Show All">
            <ScrollView>
              {places.map((place) => (
                <NearbyItem key={place.place_id} item={place} />
              ))}
            </ScrollView>
          </Sheet>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={navigation.goBack}>
              <FontAwesomeIcon icon={faChevronCircleLeft} style={styles.icon} size={34} />
            </TouchableOpacity>
          </View>
        </>
      )}
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
  map: {
    flex: 1,
  },
  markerContainer: {
    padding: 6,
    borderRadius: 20,
  },
});

export default FindNearby;
