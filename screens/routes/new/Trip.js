import React, { createRef, useEffect, useState } from "react";
import { InteractionManager } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import LandmarkItem from "../../../components/route/LandmarkItem";
import BackButton from "../../../components/map/BackButton";
import Loading from "../../../components/ui/Loading";
import BottomSheet from "../../../components/map/BottomSheet";
import { faLandmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { View, StyleSheet, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { mapStyle } from "../../../constants/mapStyle";

const Trip = ({ navigation, route }) => {
  const { trip } = route.params;
  const [loading, setLoading] = useState(true);

  let mapRef = createRef();

  // Show the screen after the screen navigation animation has finished
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading text="Loading trip" />
      ) : (
        <>
          <MapView
            onMapReady={() => {
              mapRef.fitToCoordinates(trip.locations, {
                edgePadding: { top: 0, right: 50, bottom: 200, left: 50 },
                animated: true,
              });
              setLoading(false);
            }}
            ref={(ref) => (mapRef = ref)}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            customMapStyle={mapStyle}
          >
            {/* Draw the route */}
            <Polyline coordinates={trip.locations} strokeWidth={5} strokeColor="#3890FB" />

            {/* Mark all the locations */}
            {trip.locations.map((loc, index) => (
              <Marker key={loc.latitude} tracksViewChanges={false} coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}>
                {index == 0 || index == trip.locations.length - 1 ? (
                  <FontAwesomeIcon icon={faMapMarkerAlt} size={30} style={styles.icon} />
                ) : (
                  <View style={{ backgroundColor: "#30D158", padding: 6, borderRadius: 20 }}>
                    <FontAwesomeIcon icon={faLandmark} size={18} style={styles.icon} />
                  </View>
                )}
              </Marker>
            ))}
          </MapView>
          <BottomSheet title="Route overview" buttonText="Start route">
            <ScrollView>
              {trip.locations.map((location) => (
                <LandmarkItem location={location} key={location.latitude} />
              ))}
            </ScrollView>
          </BottomSheet>

          <BackButton onPress={() => navigation.navigate("PlannedRoutes")} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "white",
  },
});

export default Trip;
