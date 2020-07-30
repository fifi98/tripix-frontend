import React, { useEffect, useState, createRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import Loading from "../../components/ui/Loading";
import NearbyItem from "../../components/nearby/NearbyItem";
import BottomSheet from "../../components/map/BottomSheet";
import api from "../../utils/api";
import { View, Alert, StyleSheet, ScrollView, InteractionManager, PermissionsAndroid } from "react-native";
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
    const getLocationsAndroid = async () => {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
          (error) => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("You have to allow Tripix to use your location!");
      }
    };

    InteractionManager.runAfterInteractions(() => {
      if (Platform.OS === "android") {
        getLocationsAndroid();
      } else {
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
      }
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
            showsCompass={false}
          >
            {places.map((place) => (
              <Marker
                key={place.place_id}
                title={place.name}
                tracksViewChanges={false}
                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              >
                <View style={{ ...styles.markerContainer, backgroundColor: color }}>
                  <FontAwesomeIcon icon={icon} size={18} style={styles.icon} />
                </View>
              </Marker>
            ))}
          </MapView>
          <BottomSheet title="Nearby" buttonText="Show All">
            <ScrollView>
              {places.map((place) => (
                <NearbyItem key={place.place_id} item={place} />
              ))}
            </ScrollView>
          </BottomSheet>
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
