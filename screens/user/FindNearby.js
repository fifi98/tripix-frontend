import React, { useEffect, useState, createRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Loading from "../../components/ui/Loading";
import NearbyItem from "../../components/nearby/NearbyItem";
import Sheet from "../../components/nearby/Sheet";
import api from "../../utils/api";
import { View, Alert, StyleSheet, ScrollView, InteractionManager } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { mapStyle } from "../../constants/mapStyle";
import BackButton from "../../components/map/BackButton";

const FindNearby = ({ route, navigation }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, icon, color } = route.params;
  let mapRef = createRef();

  // Load nearby places when the screen loads
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
    <View style={styles.container}>
      {loading ? (
        <Loading text="Loading places" />
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
          <BackButton onPress={navigation.goBack} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "white",
  },
  container: {
    flex: 1,
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
