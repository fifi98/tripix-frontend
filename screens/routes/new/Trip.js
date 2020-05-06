import React, { createRef, useEffect, useState } from "react";
import { InteractionManager } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { faChevronCircleLeft, faLandmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../../constants/mapStyle";
import { colors } from "../../../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Sheet from "../../../components/Sheet";
import LandmarkItem from "../../../components/Route/Overview/LandmarkItem";
import Loading from "../../../components/ui/Loading";

const Trip = ({ navigation, route }) => {
  const { trip } = route.params;
  const [loading, setLoading] = useState(true);

  let mapRef = createRef();

  const handleBack = () => {
    navigation.navigate("PlannedRoutes");
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
          <Loading text="Loading trip" />
        </View>
      ) : (
        <>
          <View>
            <Sheet />
          </View>
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
          <Sheet title="Route overview" buttonText="Start route">
            <ScrollView>
              {trip.locations.map((location) => (
                <LandmarkItem location={location} key={location.latitude} />
              ))}
            </ScrollView>
          </Sheet>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleBack}>
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
});

export default Trip;
